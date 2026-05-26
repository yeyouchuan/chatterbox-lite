# Chatterbox Lite

A slim userscript for Bilibili Live. It keeps only three workflows from LAPLACE Chatterbox:

- audio-only mode
- keyword replacement
- manual danmaku sending, including room emotes

This project is derived from [laplace-live/chatterbox](https://github.com/laplace-live/chatterbox) and keeps the same AGPL-3.0 license.

## Development

```bash
bun install
bun run dev
bun run build
```

Build output is written to `dist/`.

## Hosted install

The production userscript is static. You do not need to keep the local dev server running after it is hosted.

### Raw GitHub branch

This repository includes a Pages workflow that builds `dist/` on every push to `master`.
Tampermonkey updates should use the raw `gh-pages` branch files because GitHub Pages can cache stale userscript metadata.

1. Push this project to your own GitHub repository.
2. Publish the generated `dist/` files to the `gh-pages` branch.
3. Open:

```text
https://raw.githubusercontent.com/<github-user>/<repo-name>/gh-pages/chatterbox-lite.user.js
```

Install that URL in Tampermonkey. Hosted builds include:

```text
@downloadURL https://raw.githubusercontent.com/<github-user>/<repo-name>/gh-pages/chatterbox-lite.user.js
@updateURL   https://raw.githubusercontent.com/<github-user>/<repo-name>/gh-pages/chatterbox-lite.meta.js
```

GitHub Pages can still host the same static files as a backup, but the raw URLs are the canonical update path.

Local builds omit those fields unless `USERSCRIPT_BASE_URL` is set:

```bash
USERSCRIPT_BASE_URL=https://example.com/chatterbox-lite bun run build
```

## License

AGPL-3.0. See `LICENSE` and `NOTICE.md`.
