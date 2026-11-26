## Development

When starting the dev server, use background mode:

```
bun run dev --background
```

Manage the background server with `bun run astro dev stop`, `bun run astro dev status`, and `bun run astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Coding standards

### Styling

- Style with [Tailwind CSS](https://tailwindcss.com) v4 utility classes in the markup. Don't add `<style>` blocks to components or pages.
- Tailwind is loaded through the `@tailwindcss/vite` plugin in `astro.config.mjs`. There is no `tailwind.config.js`: configuration lives in CSS.
- `src/styles/global.css` is the only stylesheet. It holds:
  - design tokens in `@theme` (colours, fonts), with dark-mode values overriding the same variables under `prefers-color-scheme: dark`;
  - base element styles in `@layer base` (headings, links, focus ring, reduced motion);
  - shared custom utilities defined with `@utility` (`wrapper`, `eyebrow`, `gradient-text`, `bg-brand-gradient`).
- Use the theme colours (`bg-bg`, `bg-surface`, `text-fg`, `text-muted`, `border-border`, `text-accent`, ...) rather than Tailwind's palette or hex values, so light and dark mode stay in sync. Add a new token to `@theme` (and its dark value) before using a new colour.
- Arbitrary values (`text-[clamp(...)]`) are fine for one-off fluid sizes. If the same value or class list is needed in several places, make it a `@utility` in `global.css`.
- Keep accessibility notes (contrast, target size, forced-colours fallbacks) as comments next to the classes or tokens they explain.
