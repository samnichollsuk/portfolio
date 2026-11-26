// @ts-check

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://samnicholls.co.uk",
	integrations: [sitemap({ filter: (page) => !page.endsWith("/404/") })],
	build: {
		// The stylesheet is small, so inlining it saves a render-blocking request.
		inlineStylesheets: "always",
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
