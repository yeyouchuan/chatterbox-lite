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

### GitHub Pages

This repository includes a Pages workflow that builds `dist/` on every push to `master`.

1. Push this project to your own GitHub repository.
2. In the repository settings, enable GitHub Pages with **GitHub Actions** as the source.
3. Open:

```text
https://<github-user>.github.io/<repo-name>/chatterbox-lite.user.js
```

Install that URL in Tampermonkey. Hosted builds include:

```text
@downloadURL https://<github-user>.github.io/<repo-name>/chatterbox-lite.user.js
@updateURL   https://<github-user>.github.io/<repo-name>/chatterbox-lite.meta.js
```

Local builds omit those fields unless `USERSCRIPT_BASE_URL` is set:

```bash
USERSCRIPT_BASE_URL=https://example.com/chatterbox-lite bun run build
```

## License

AGPL-3.0. See `LICENSE` and `NOTICE.md`.
