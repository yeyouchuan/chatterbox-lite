import { GM_info } from '$'

export const VERSION = GM_info.script.version

export const PROJECT_URL = 'https://github.com/laplace-live/chatterbox'
export const PROJECT_NAME = 'Chatterbox Lite'

export const BASE_URL = {
  BILIBILI_ROOM_INIT: 'https://api.live.bilibili.com/room/v1/Room/room_init',
  BILIBILI_MSG_SEND: 'https://api.live.bilibili.com/msg/send',
  BILIBILI_GET_EMOTICONS: 'https://api.live.bilibili.com/xlive/web-ucenter/v2/emoticon/GetEmoticons',
  REMOTE_KEYWORDS: 'https://workers.vrp.moe/gh-raw/laplace-live/public/master/artifacts/livesrtream-keywords.json',
} as const
