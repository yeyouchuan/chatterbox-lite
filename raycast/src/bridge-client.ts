import {
  BRIDGE_HOST,
  BRIDGE_PORTS,
  type BridgeCommandPayloads,
  type BridgeCommandResults,
  type BridgeCommandType,
  type BridgeState,
} from "./protocol";

interface FetchResponseLike {
  ok: boolean;
  status?: number;
  statusText?: string;
  json: () => Promise<unknown>;
}

export type FetchLike = (
  url: string,
  init?: RequestInit,
) => Promise<FetchResponseLike>;

function asErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export async function findBridgeBaseUrl(
  fetcher: FetchLike = fetch,
): Promise<string | null> {
  for (const port of BRIDGE_PORTS) {
    const baseUrl = `http://${BRIDGE_HOST}:${port}`;
    try {
      const response = await fetcher(`${baseUrl}/ping`);
      if (!response.ok) continue;

      const body = (await response.json()) as { ok?: boolean; app?: string };
      if (body.ok) return baseUrl;
    } catch {
      // Try the next configured local helper port.
    }
  }

  return null;
}

export function formatBridgeClientError(error: unknown): string {
  const message = asErrorMessage(error);
  if (message.includes("No Bilibili live page bridge connected")) {
    return "还没有连接到直播间页面。请先打开或刷新 Bilibili 直播间，并确认 Chatterbox Lite userscript 已启用。";
  }

  return `没有连接到 Chatterbox Lite helper。请先启动桌面 helper，然后重试。${message ? ` (${message})` : ""}`;
}

async function getBridgeBaseUrl(fetcher: FetchLike = fetch): Promise<string> {
  const baseUrl = await findBridgeBaseUrl(fetcher);
  if (!baseUrl) throw new Error("Chatterbox Lite helper is not running");
  return baseUrl;
}

async function readJsonResponse<T>(response: FetchResponseLike): Promise<T> {
  const body = (await response.json()) as {
    ok?: boolean;
    result?: T;
    state?: T;
    error?: string;
  };
  if (!response.ok || body.ok === false) {
    throw new Error(
      body.error ||
        `HTTP ${response.status ?? "unknown"} ${response.statusText ?? ""}`.trim(),
    );
  }

  return (body.result ?? body.state ?? body) as T;
}

export async function getBridgeState(
  fetcher: FetchLike = fetch,
): Promise<BridgeState> {
  const baseUrl = await getBridgeBaseUrl(fetcher);
  const response = await fetcher(`${baseUrl}/state`);
  return await readJsonResponse<BridgeState>(response);
}

export async function sendBridgeCommand<T extends BridgeCommandType>(
  type: T,
  payload: BridgeCommandPayloads[T],
  fetcher: FetchLike = fetch,
): Promise<BridgeCommandResults[T]> {
  const baseUrl = await getBridgeBaseUrl(fetcher);
  const response = await fetcher(`${baseUrl}/command`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, payload }),
  });

  return await readJsonResponse<BridgeCommandResults[T]>(response);
}

export async function sendDanmaku(
  message: string,
): Promise<BridgeCommandResults["sendDanmaku"]> {
  return await sendBridgeCommand("sendDanmaku", { message });
}

export async function fetchEmoticons(): Promise<
  BridgeCommandResults["fetchEmoticons"]
> {
  return await sendBridgeCommand("fetchEmoticons", {});
}
