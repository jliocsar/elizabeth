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
[![DrizzleORM][drizzle-badge]][drizzle-url]
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
[oxc-badge]: https://img.shields.io/badge/oxc-1B1A1F?style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAVFSURBVEiJjZVrjJVXFYafvb9znwszXA5lGIxosNpBWxBaqtEaoVo1tkpqilakUgNtLDRawMYCPYkIbXVoQqsRsBZibMcyFrDRRCcY0oKtEKumF2yLWCo3Z4ZzmNs55/v2t9fyxwyTAWYs6+da2c/a693v3ttwGVHY+lwuzshG8bIIILD26SC0DxSWf7H8bmvNWIWuLq2zOVYBc3/9p+fdG8eP3zxQGVCA902dZm68du7R5ivyR43hoMvROs2YymU3ONOn+aRlHzATONH6zJ6mVNLKrZ/5bKvBZpOBXWmtxRgzANQAf7HKTdMbzbmLWYmLE6pqimWeBVowfHdzW1t7HAfvTJrYNOBt+nsAXaWSPPtcu+0Pqx+/984VX8bwoFG2Are96wTFAf2cwu8NPD6+xqwAuGfLk6/V1dZf1dgw/oQCpZ5ic+ls95tbVy2/EuDFTr3DQP+8vGm/nAY/VPj+odff+toLr71+56mTxz7QMG7iv3r7e26oqak3BqW3twdreaVxfN4Wz3a65inTl/3gmzcfHk3uSyQqKyZQePXYsbtcFH5SBZwLpzXUNXLinbeoVvoR72mYOPnDEntcFFLs6doELBitgb04ETleCgVumPvR09VK+bDA6TByB3O1dUyf0UIqnaWuYQLY5Ksujo4L5p/lvt6No8FHlUhVgzfP8ZKF2cDqGY1m87qde2cpvAxw/N9vkEpnqcllF2y591v7xgJfMsEDO/bevnbnnrfX/fK3Swdibqkqf4+E1iMl7Zh39TUzhzVNJEinMySyNZf4fs32Z5at3tb29n3b2m6/YILCk7vfG1v7ClALhGKCOQsXfOFYkOARY1lmIVkulyn1naPY1UkswpR8/v6p+eaftORNP8B9W9s/aIj/pqoZVSmryNWPfnvxUYuqccZuG4IDpK3KEw8f2BXOypt7ysJVp4ulp3oGBpg0YTItM69h1kdm0zSl+SGToPtIUX/2jzN9ecQ9IeIzIh4vkotVt6NqzNode+/G8NNR5FuzYcktPwJYt3PvrJ6e4svd//0PKkptXT2f/tSNj185o+VD1jD/1KmT+zoO7J8vqqgqqoKKAnK3xbB+jPNZWygULIBzjmyujiua3k8yncV52P/C/j2zJ5kF5cgv3PfnA9d5EUQ84j3iBRHBe1lvQTsAGUlWVRWJOwqFwnBexGMTAdnacdTU15MbV98D8LGmxO7QVTvEex0EewZl8uJF/mg3LPnSNxT7HhGvXjziY7z47igYWHIe7rzUyNAODWCMxTlJn69nqnaxiO8WHxN7T+xjcXE4bduq5XcM34PV258+7IU5ARZjDaBbciePfOfs+GuTiUTpKUUXqirVSplEIgEmaLem9+sTikXXWT/1Ua+6UrzHSwxw6Bf3r7gORjwV1Ur4mDG60ymkUmnArOydPGNRoMWUqDaoKirnFTOoxLfGZOefrmtyKpIX8TgXgSoetlxwD4aEN3e1/vygItcbA6lMFoMZdoQOOcS5iCAIGOkYESEKq4gIoId+9eDqeRijMPItMkaTFVnsompXtVqh71yJsFoZdsTQwQEw7BjxuDCi0t+LC0N87DqTJG87D79wgqFYumHzHBfHvxORPKrYICCZzhAESYy1iHok9sQuIgpDxDtUQQ2dBvP5XQ+t/+tI3qhf5tKHH2uq9PW2+Tj+hKoyuB0lmcqAKlFYGYQOVjSw9vnaXO2iHYU1Zy5mjfnpA3x17aaboihco3E0V0Rqh1spGGv6TBAcDlQf+U3rxj+Mxfi/DUbGV1atuz6MqrsV1UwquXDXjze9eDnr/gem7OakrvhsGwAAAABJRU5ErkJggg==
[oxc-url]: https://github.com/web-infra-dev/oxc
[elysia-url]: https://elysiajs.com/
[drizzle-badge]: https://img.shields.io/badge/drizzle-111?style=flat-square&logo=drizzle&logoColor=c5f74f
[drizzle-url]: https://orm.drizzle.team/
[lucia-url]: https://lucia-auth.com/
[skott-url]: https://github.com/antoine-coulon/skott
