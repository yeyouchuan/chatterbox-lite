import {
  Action,
  ActionPanel,
  Color,
  Grid,
  Icon,
  Keyboard,
  showToast,
  Toast,
} from "@raycast/api";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  fetchEmoticons,
  formatBridgeClientError,
  getBridgeState,
  sendDanmaku,
} from "./bridge-client";
import { findOpenLiveRoomTabs } from "./browser-tabs";
import {
  buildEmoteSections,
  getEmotePackageOptions,
  getLockedEmoteReason,
  isLockedEmote,
  toggleFavoriteEmote,
  type RaycastEmote,
} from "./emotes";
import type { BilibiliEmoticonPackage } from "./protocol";
import {
  addRecentItem,
  DEFAULT_CHATTERBOX_STORAGE,
  DEFAULT_MODE_VALUE,
  RECENT_EMOTE_LIMIT,
  RECENT_TEXT_LIMIT,
  loadChatterboxStorage,
  saveChatterboxStorage,
  type ChatterboxStorageState,
} from "./storage";

type ConnectionStatusKind =
  | "loading"
  | "connected"
  | "helper-missing"
  | "disconnected";

interface ConnectionStatus {
  kind: ConnectionStatusKind;
  title: string;
  subtitle: string;
  icon: Icon;
}

const LOADING_STATUS: ConnectionStatus = {
  kind: "loading",
  title: "正在连接",
  subtitle: "正在读取 helper 和直播间状态",
  icon: Icon.CircleProgress,
};

function describeRoom(roomId: number | null, title: string): string {
  return roomId
    ? `房间 ${roomId}${title ? ` · ${title}` : ""}`
    : title || "已连接直播间";
}

async function buildDisconnectedMessage(): Promise<string> {
  const liveTabs = await findOpenLiveRoomTabs();
  if (liveTabs.length > 0) {
    return "检测到已打开的 Bilibili 直播间，请刷新页面并确认 Chatterbox Lite userscript 已启用。";
  }

  return "未连接直播间。请先启动 Chatterbox Lite helper 并打开 Bilibili 直播间。";
}

function emoteModeValue(packageId: string): string {
  return `emote:${packageId}`;
}

function resolveActiveModeValue(
  modeValue: string,
  packageOptions: Array<{ id: string; name: string }>,
): string {
  if (modeValue === DEFAULT_MODE_VALUE || modeValue === "emote:all") {
    return modeValue;
  }

  if (
    modeValue.startsWith("emote:") &&
    packageOptions.some((pkg) => emoteModeValue(pkg.id) === modeValue)
  ) {
    return modeValue;
  }

  return "emote:all";
}

function getConnectionActionIcon(status: ConnectionStatus) {
  return {
    source: Icon.CircleFilled,
    tintColor:
      status.kind === "connected"
        ? Color.Green
        : status.kind === "loading"
          ? Color.Yellow
          : Color.Red,
  };
}

function getConnectionStatusMark(status: ConnectionStatus): string {
  if (status.kind === "connected") return "🟢";
  if (status.kind === "loading") return "🟡";
  return "🔴";
}

function emoteItemId(sectionId: string, unique: string): string {
  return `${sectionId}:${unique}`;
}

async function sendMessage(
  message: string,
  successTitle: string,
  failureTitle: string,
): Promise<boolean> {
  const toast = await showToast({
    style: Toast.Style.Animated,
    title: "发送中",
  });

  try {
    const result = await sendDanmaku(message);
    if (result.success) {
      toast.style = Toast.Style.Success;
      toast.title = successTitle;
      toast.message = result.isEmoticon ? "已作为表情发送" : message;
      return true;
    }

    toast.style = Toast.Style.Failure;
    toast.title = failureTitle;
    toast.message = result.error ?? "Bilibili returned an unknown error";
    return false;
  } catch (error) {
    toast.style = Toast.Style.Failure;
    toast.title = failureTitle;
    toast.message = formatBridgeClientError(error);
    return false;
  }
}

function getErrorStatus(error: unknown): ConnectionStatus {
  const message = formatBridgeClientError(error);
  if (message.includes("还没有连接到直播间页面")) {
    return {
      kind: "disconnected",
      title: "直播间 userscript 未连接",
      subtitle: message,
      icon: Icon.ExclamationMark,
    };
  }

  return {
    kind: "helper-missing",
    title: "helper 未启动",
    subtitle: message,
    icon: Icon.ExclamationMark,
  };
}

function makeStorageUpdate(
  current: ChatterboxStorageState,
  patch: Partial<ChatterboxStorageState>,
): ChatterboxStorageState {
  return {
    recentTextMessages: patch.recentTextMessages ?? current.recentTextMessages,
    recentEmoteUniques: patch.recentEmoteUniques ?? current.recentEmoteUniques,
    favoriteEmoteUniques:
      patch.favoriteEmoteUniques ?? current.favoriteEmoteUniques,
    lastModeValue: patch.lastModeValue ?? current.lastModeValue,
  };
}

export default function Command() {
  const [input, setInput] = useState("");
  const [modeValue, setModeValue] = useState(DEFAULT_MODE_VALUE);
  const [storageState, setStorageState] = useState<ChatterboxStorageState>(
    DEFAULT_CHATTERBOX_STORAGE,
  );
  const [status, setStatus] = useState<ConnectionStatus>(LOADING_STATUS);
  const [packages, setPackages] = useState<BilibiliEmoticonPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>();

  const persistStorage = useCallback(
    async (nextState: ChatterboxStorageState) => {
      setStorageState(nextState);
      await saveChatterboxStorage(nextState);
    },
    [],
  );

  const refreshConnection = useCallback(async () => {
    setIsLoading(true);
    setStatus(LOADING_STATUS);

    try {
      const state = await getBridgeState();
      if (!state.connected || !state.roomState) {
        setPackages([]);
        setStatus({
          kind: "disconnected",
          title: "直播间 userscript 未连接",
          subtitle: await buildDisconnectedMessage(),
          icon: Icon.ExclamationMark,
        });
        return;
      }

      setStatus({
        kind: "connected",
        title: describeRoom(state.roomState.roomId, state.roomState.title),
        subtitle: "已连接，可以发送弹幕和表情",
        icon: Icon.CheckCircle,
      });
      setPackages(await fetchEmoticons());
    } catch (error) {
      setPackages([]);
      setStatus(getErrorStatus(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    async function loadPanel() {
      const stored = await loadChatterboxStorage();
      setStorageState(stored);
      setModeValue(stored.lastModeValue);
      await refreshConnection();
    }

    void loadPanel();
  }, [refreshConnection]);

  const packageOptions = useMemo(
    () => getEmotePackageOptions(packages),
    [packages],
  );
  const activeModeValue = resolveActiveModeValue(modeValue, packageOptions);
  const trimmedInput = input.trim();
  const connectionActionIcon = getConnectionActionIcon(status);
  const connectionStatusMark = getConnectionStatusMark(status);
  const connected = status.kind === "connected";

  const emoteSections = useMemo(
    () =>
      buildEmoteSections({
        packages,
        query: "",
        modeValue: activeModeValue,
        recent: storageState.recentEmoteUniques,
        favorites: storageState.favoriteEmoteUniques,
      }),
    [
      activeModeValue,
      packages,
      storageState.favoriteEmoteUniques,
      storageState.recentEmoteUniques,
    ],
  );

  function handleSearchTextChange(value: string) {
    setInput(value);
    setSelectedItemId(undefined);
  }

  async function handleModeChange(value: string) {
    setModeValue(value);
    setSelectedItemId(undefined);
    await persistStorage(
      makeStorageUpdate(storageState, { lastModeValue: value }),
    );
  }

  async function updateStorage(
    patch: Partial<ChatterboxStorageState>,
  ): Promise<ChatterboxStorageState> {
    const nextState = makeStorageUpdate(storageState, patch);
    await persistStorage(nextState);
    return nextState;
  }

  async function sendTextMessage(message: string) {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      await showToast({ style: Toast.Style.Failure, title: "弹幕不能为空" });
      return;
    }

    const sent = await sendMessage(
      trimmedMessage,
      "弹幕已发送",
      "弹幕发送失败",
    );
    if (!sent) return;

    await updateStorage({
      recentTextMessages: addRecentItem(
        storageState.recentTextMessages,
        trimmedMessage,
        RECENT_TEXT_LIMIT,
      ),
      lastModeValue: activeModeValue,
    });
    setInput("");
    setSelectedItemId(undefined);
  }

  async function sendDraft() {
    await sendTextMessage(trimmedInput);
  }

  async function showLockedEmoteToast(emote: RaycastEmote) {
    await showToast({
      style: Toast.Style.Failure,
      title: "表情不可发送",
      message: getLockedEmoteReason(emote),
    });
  }

  async function sendEmote(emote: RaycastEmote) {
    if (isLockedEmote(emote)) {
      await showLockedEmoteToast(emote);
      return;
    }

    const sent = await sendMessage(emote.unique, "表情已发送", "表情发送失败");
    if (!sent) return;

    await updateStorage({
      recentEmoteUniques: addRecentItem(
        storageState.recentEmoteUniques,
        emote.unique,
        RECENT_EMOTE_LIMIT,
      ),
      lastModeValue: modeValue,
    });
    setInput("");
  }

  async function toggleFavorite(emote: RaycastEmote) {
    const nextFavorites = toggleFavoriteEmote(
      storageState.favoriteEmoteUniques,
      emote.unique,
    );
    const isPinned = nextFavorites.includes(emote.unique);

    await updateStorage({
      favoriteEmoteUniques: nextFavorites,
      lastModeValue: modeValue,
    });
    await showToast({
      style: Toast.Style.Success,
      title: isPinned ? "已收藏表情" : "已取消收藏",
      message: emote.title,
    });
  }

  function renderConnectionActions() {
    return (
      <ActionPanel>
        {trimmedInput && (
          <Action
            title={`${connectionStatusMark} Send Danmaku`}
            icon={connectionActionIcon}
            onAction={() => void sendDraft()}
          />
        )}
        <Action
          title={`${connectionStatusMark} Refresh Connection`}
          icon={Icon.ArrowClockwise}
          shortcut={Keyboard.Shortcut.Common.Refresh}
          onAction={() => void refreshConnection()}
        />
      </ActionPanel>
    );
  }

  function renderEmoteActions(
    emote: RaycastEmote,
    locked: boolean,
    favorite: boolean,
  ) {
    return (
      <ActionPanel>
        {trimmedInput && (
          <Action
            title={`${connectionStatusMark} Send Danmaku`}
            icon={connectionActionIcon}
            onAction={() => void sendDraft()}
          />
        )}
        <Action
          title={
            locked ? "Show Lock Reason" : `${connectionStatusMark} Send Emote`
          }
          icon={locked ? Icon.Lock : connectionActionIcon}
          onAction={() => void sendEmote(emote)}
        />
        <Action
          title={favorite ? "Unpin Favorite" : "Pin Favorite"}
          icon={favorite ? Icon.PinDisabled : Icon.Pin}
          shortcut={Keyboard.Shortcut.Common.Pin}
          onAction={() => void toggleFavorite(emote)}
        />
        <Action
          title={`${connectionStatusMark} Refresh Connection`}
          icon={Icon.ArrowClockwise}
          shortcut={Keyboard.Shortcut.Common.Refresh}
          onAction={() => void refreshConnection()}
        />
      </ActionPanel>
    );
  }

  return (
    <Grid
      actions={renderConnectionActions()}
      columns={8}
      aspectRatio="1"
      fit={Grid.Fit.Contain}
      inset={Grid.Inset.Small}
      filtering={false}
      isLoading={isLoading}
      navigationTitle="Arclight"
      searchBarPlaceholder="输入弹幕，Enter 发送"
      searchText={input}
      selectedItemId={selectedItemId}
      onSearchTextChange={handleSearchTextChange}
      onSelectionChange={(id) => setSelectedItemId(id ?? undefined)}
      searchBarAccessory={
        <Grid.Dropdown
          tooltip="切换模式"
          value={activeModeValue}
          onChange={(value) => void handleModeChange(value)}
        >
          <Grid.Dropdown.Section title="Emotes">
            <Grid.Dropdown.Item
              title="Emote: All"
              value="emote:all"
              icon={Icon.Emoji}
            />
          </Grid.Dropdown.Section>
          {packageOptions.length > 0 && (
            <Grid.Dropdown.Section title="Packages">
              {packageOptions.map((pkg) => (
                <Grid.Dropdown.Item
                  key={pkg.id}
                  title={`Emote: ${pkg.name}`}
                  value={emoteModeValue(pkg.id)}
                  icon={Icon.Emoji}
                />
              ))}
            </Grid.Dropdown.Section>
          )}
        </Grid.Dropdown>
      }
    >
      {emoteSections.map((section) => (
        <Grid.Section key={section.id} title={section.packageName} columns={8}>
          {section.emotes.map((emote) => {
            const locked = isLockedEmote(emote);
            const favorite = storageState.favoriteEmoteUniques.includes(
              emote.unique,
            );

            return (
              <Grid.Item
                key={`${section.id}:${emote.unique}`}
                id={emoteItemId(section.id, emote.unique)}
                content={emote.url || Icon.Emoji}
                title={emote.title}
                keywords={[
                  emote.title,
                  emote.unique,
                  emote.packageName,
                  emote.emoji,
                  emote.descript,
                ]}
                accessory={
                  locked
                    ? { icon: Icon.Lock }
                    : favorite
                      ? { icon: Icon.Pin }
                      : undefined
                }
                actions={renderEmoteActions(emote, locked, favorite)}
              />
            );
          })}
        </Grid.Section>
      ))}

      {emoteSections.length === 0 && (
        <Grid.EmptyView
          icon={Icon.EmojiSad}
          title={packages.length > 0 ? "没有表情" : "暂无表情"}
          description={connected ? "请切换表情包或刷新连接" : status.subtitle}
          actions={renderConnectionActions()}
        />
      )}
    </Grid>
  );
}
