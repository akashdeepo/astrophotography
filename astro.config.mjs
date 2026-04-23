// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Project site: https://akashdeepo.github.io/astrophotography/
// If you ever move this to a user site (akashdeepo.github.io at the root),
// set `site` to that URL and remove `base`.
export default defineConfig({
  site: 'https://akashdeepo.github.io',
  base: '/astrophotography/',
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // Keeps built image URLs clean and hashed; originals are preserved.
  },
});
