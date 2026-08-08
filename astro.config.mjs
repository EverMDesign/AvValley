import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/edge';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://avvalley.com',
  output: 'hybrid',
  adapter: vercel(),
});
