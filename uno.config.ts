import { defineConfig, transformerDirectives, transformerVariantGroup } from 'unocss'
import { presetMini } from '@bryce-loskie/unocss-preset-mini'

export default defineConfig({
  presets: [
    presetMini({
      useIcon: true,
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
