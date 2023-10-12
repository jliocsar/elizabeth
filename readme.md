<div align=center>

# BETH Stack Boilerplate

<picture>
  <source
    media="(prefers-color-scheme: dark)"
    srcset="./public/static/demon-white.png"
  />
  <img alt="Logo" src="./public/static/demon.png" width="196">
</picture>

_Welcome, friend!_

[![Bun][bun-badge]][bun-url]
[![Turso][turso-badge]][turso-url]
[![HTMX][htmx-badge]][htmx-url]
[![PostCSS][postcss-badge]][postcss-url]
[![Tailwind][tailwind-badge]][tailwind-url]
[![oxc][oxc-badge]][oxc-url]

</div>

Boilerplate for the BETH stack:

- [Bun][bun-url]
- [ElysiaJS][elysia-url]
- [Turso][turso-url] + [Drizzle][drizzle-url]
- [HTMX][htmx-url]
- [Lucia][lucia-url]
- [Tailwind][tailwind-url]
- [PostCSS][postcss-url]
- [Oxc][oxc-url]
- [Skott][skott-url]

## TODO

- [ ] Integrate [`fly.io`](https://fly.io/)
  - Check how Turso can be used to deploy everything on the edge 🚀

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

This project was created using `bun init` in bun v1.0.3. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

[bun-badge]: https://img.shields.io/badge/bun-fbf0df?style=flat-square&logo=bun&logoColor=fbf0df&color=14151a
[bun-url]: https://bun.sh/
[turso-badge]: https://img.shields.io/badge/turso-121c22?style=flat-square&logo=turso&logoColor=4ff8d2
[turso-url]: https://turso.tech/
[tailwind-badge]: https://img.shields.io/badge/tailwind-0f172a?style=flat-square&logo=tailwindcss&logoColor=38bdf8
[tailwind-url]: https://tailwindcss.com/
[postcss-badge]: https://img.shields.io/badge/postcss-211D14?style=flat-square&logo=postcss&logoColor=DD3A0A
[postcss-url]: https://postcss.org/
[htmx-badge]: https://img.shields.io/badge/htmx-111?style=flat-square&logo=htmx
[htmx-url]: https://htmx.org/
[oxc-badge]: https://img.shields.io/badge/oxc-273455?style=flat-square&color=9adcd8
[oxc-url]: https://github.com/web-infra-dev/oxc
[elysia-url]: https://elysiajs.com/
[drizzle-url]: https://orm.drizzle.team/
[lucia-url]: https://lucia-auth.com/
[skott-url]: https://github.com/antoine-coulon/skott
