import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import themes from "astro-themes";

// https://astro.build/config
export default defineConfig({
  site: 'https://pediatri.netlify.app',
  integrations: [tailwind(), themes()]
}); 