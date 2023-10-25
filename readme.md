<div align=center>

# BETH Stack Boilerplate

<picture>
  <source
    media="(prefers-color-scheme: dark)"
    srcset="./public/static/crow-white.png"
  />
  <img alt="Logo" src="./public/static/crow.png" width="256">
</picture>

_Boilerplate for the BETH stack_

</div>

## Description

- [Bun][bun-url]
- [ElysiaJS][elysia-url]
- [Turso][turso-url] + [Drizzle][drizzle-url]
- [HTMX][htmx-url]
- [Lucia][lucia-url]
- [Tailwind][tailwind-url]
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

## TODO

- [ ] Integrate [`fly.io`](https://fly.io/)
- [ ] Check how Turso can be used with `fly.io` to deploy everything to the edge 🚀
- [ ] Any way to remove unused JS?
- [ ] Add local fonts for compression

---

<div align=center>

<small>This project was created using `bun init` in bun v1.0.3. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.</small>

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
[postcss-badge]: https://img.shields.io/badge/postcss-211D14?style=flat-square&logo=postcss&logoColor=DD3A0A
[postcss-url]: https://postcss.org/
[htmx-badge]: https://img.shields.io/badge/‹&#47;›_htmx-111?style=flat-square
[htmx-url]: https://htmx.org/
[oxc-badge]: https://img.shields.io/badge/&#9875;_oxc-273455?style=flat-square&color=9adcd8
[oxc-url]: https://github.com/web-infra-dev/oxc
[elysia-url]: https://elysiajs.com/
[drizzle-url]: https://orm.drizzle.team/
[lucia-url]: https://lucia-auth.com/
[skott-url]: https://github.com/antoine-coulon/skott
