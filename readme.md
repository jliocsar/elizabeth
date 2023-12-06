<div align=center>

<picture>
  <source
    media="(prefers-color-scheme: dark)"
    srcset="packages/web/src/static/crow-white.png"
  />
  <img alt="logo" src="packages/web/src/static/crow.png" width="256">
</picture>

# Elizabeth

_BETH stack boilerplate_

🏗️ **Work in progress!** 🏗️

</div>

## Features

- 🔥 Development server with hot-reload (using [WebSocket](https://bun.sh/docs/api/websockets));
- 🔒 Authentication;
- 🥡 Response caching;
- 🐥 `gzip` compression on static files during build time;
- 👨‍💻 CLI tool for common operations;

## Stack

- [Bun][bun-url]
- [ElysiaJS][elysia-url]
- [Turso][turso-url] + [Drizzle][drizzle-url]
- [HTMX][htmx-url]
- [Lucia][lucia-url]
- [Tailwind][tailwind-url] + [daisyUI][daisyui-url]
- [PostCSS][postcss-url]
- [Oxc][oxc-url]
- [Skott][skott-url]

## Usage

To install dependencies:

```bash
bun i
```

To run:

> **Note**
> Setup the `.env` file before running the `start` command

```bash
bun start
```

To run the CLI:

```bash
bun cli
```

## How it works

For the styles/static files, this boilerplate currently uses a customized [Bun plugin for PostCSS](https://github.com/jliocsar/elizabeth/blob/main/plugins/compressed-static-build.ts) to compile `.css` _and_ compress them using `gzip` at the application start up/build time, outputting these files to `public` (build results are ignored by default).

The boilerplate also includes a `cli build` command that will fetch and minify the `htmx`/`hyperscript` JS files at build time, outputting them to `public/external/app.js` (also ignored and compressed by default).

Both are ran before the `start`/`dev` commands (currently changing `css` files _does not_ trigger a reload).

The [`Layout`](https://github.com/jliocsar/elizabeth/blob/main/packages/web/src/components/layout/index.tsx) component is used on each page of the application to include the built style/script files.

---

<div align=center>

This project was created using `bun init` in bun v1.0.3. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

**This is not production ready yet!**

[![Bun][bun-badge]][bun-url]
[![Turso][turso-badge]][turso-url]
[![HTMX][htmx-badge]][htmx-url]
[![PostCSS][postcss-badge]][postcss-url]
[![Tailwind][tailwind-badge]][tailwind-url]
[![oxc][oxc-badge]][oxc-url]

</div>

[bun-badge]: https://img.shields.io/badge/bun-fbf0df?style=flat-square&logo=bun&logoColor=fbf0df&color=14151a
[bun-url]: https://bun.sh/
[turso-badge]: https://img.shields.io/badge/turso-121c22?style=flat-square&logo=turso&logoColor=4ff8d2
[turso-url]: https://turso.tech/
[tailwind-badge]: https://img.shields.io/badge/tailwind-0f172a?style=flat-square&logo=tailwindcss&logoColor=38bdf8
[tailwind-url]: https://tailwindcss.com/
[daisyui-url]: https://github.com/saadeghi/daisyui
[postcss-badge]: https://img.shields.io/badge/postcss-211D14?style=flat-square&logo=postcss&logoColor=DD3A0A
[postcss-url]: https://postcss.org/
[htmx-badge]: https://img.shields.io/badge/‹&#47;›_htmx-111?style=flat-square
[htmx-url]: https://htmx.org/
[oxc-badge]: https://img.shields.io/badge/oxc-273455?style=flat-square&color=9adcd8
[oxc-url]: https://github.com/web-infra-dev/oxc
[elysia-url]: https://elysiajs.com/
[drizzle-url]: https://orm.drizzle.team/
[lucia-url]: https://lucia-auth.com/
[skott-url]: https://github.com/antoine-coulon/skott
