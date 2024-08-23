import { defineConfig } from 'taze'

export default defineConfig({
  exclude: [
    'unocss',
    'vite',
    'pinia',
    '@tanstack/vue-query',
    '@vueuse/core',
  ],
})
