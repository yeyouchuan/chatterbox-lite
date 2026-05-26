import { BrowserExtension } from "@raycast/api";

const BILIBILI_LIVE_ROOM_RE = /^https:\/\/live\.bilibili\.com\/\d+\/?($|[?#])/;

export async function findOpenLiveRoomTabs(): Promise<
  Array<{ title?: string; url: string }>
> {
  try {
    const tabs = await BrowserExtension.getTabs();
    return tabs
      .filter((tab) => BILIBILI_LIVE_ROOM_RE.test(tab.url))
      .map((tab) => ({
        title: tab.title,
        url: tab.url,
      }));
  } catch {
    return [];
  }
}
