# Portfolio

Source for [samnicholls.co.uk](https://samnicholls.co.uk), the personal portfolio of Sam Nicholls, a senior
front-end engineer.

It's a single static page (intro, projects and contact) with a 404 page. It ships no client-side JavaScript,
supports light and dark mode, and respects reduced-motion settings. Accessibility is built in: colour
contrast, target sizes and forced-colours fallbacks follow WCAG 2.2.

## Tech stack

- [Astro](https://astro.build) 7 with TypeScript, building a fully static site
- [Tailwind CSS](https://tailwindcss.com) v4 for styling, configured in CSS (no `tailwind.config.js`)
- [Bun](https://bun.sh) as the package manager and script runner
- [Biome](https://biomejs.dev) for linting and formatting, and `astro check` for type-checking
- [sharp](https://sharp.pixelplumbing.com) to generate the share image and touch icon

## Getting started

You need [Bun](https://bun.sh) 1.4 or later. The exact version is pinned in `package.json` under
`packageManager`.

```sh
bun install
bun run dev
```

Then open http://localhost:4321. The page reloads as you edit files.

For VS Code, install the recommended extensions when prompted (Astro and Biome). The workspace settings
format files with Biome when you save.

## Commands

| Command             | Action                                               |
| :------------------ | :--------------------------------------------------- |
| `bun install`       | Install dependencies                                 |
| `bun run dev`       | Start the dev server at `localhost:4321`             |
| `bun run build`     | Build the production site to `./dist/`               |
| `bun run preview`   | Serve the production build locally                   |
| `bun run check`     | Lint, check formatting (Biome) and type-check        |
| `bun run check:fix` | Apply Biome's safe fixes and formatting              |
| `bun run typecheck` | Type-check only (`astro check`)                      |
| `bun run images`    | Regenerate `og-image.png` and `apple-touch-icon.png` |

Run `bun run check` before committing. The same checks run in CI on every pull request.

## Project structure

```text
src/
├── components/      Page sections (Header, Hero, Projects, Contact, Footer) and the shared Section wrapper
├── data/profile.ts  Name, job title, email, summary and social links, used across the site
├── layouts/         BaseLayout: <head> metadata, share tags, structured data and the skip link
├── pages/           Routes: index.astro (home) and 404.astro
└── styles/
    └── global.css   Tailwind import, design tokens, base styles and custom utilities
public/              Static files copied as-is (favicon, share image, robots.txt, headers)
scripts/             generate-images.ts, which renders the share image and touch icon
docs/                Further documentation (deployment)
```

## Making changes

- **Personal details:** edit `src/data/profile.ts`. The name, title, email and social links are read from
  there by the page, the metadata and the image script. If you change the name, title or initials,
  run `bun run images` to redraw the share image and touch icon.
- **Content and layout:** each section is a component in `src/components/`, and `src/pages/index.astro`
  sets their order.
- **Styling:** use Tailwind classes in the markup. Colours and fonts are defined in `@theme` in
  `src/styles/global.css`, with dark-mode values just below. Use the theme colours (`bg-surface`,
  `text-muted`, `border-border`…) rather than hex values or Tailwind's default palette.
- **Brand colours:** these are repeated in a few places that can't read CSS variables: the `theme-color`
  meta tags in `BaseLayout.astro`, `public/favicon.svg` and `scripts/generate-images.ts`. Change them
  together.

The full coding standards (styling, linting and formatting rules) are in [AGENTS.md](AGENTS.md).

## Deployment

See [docs/deployment.md](docs/deployment.md).
