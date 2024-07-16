import { defineConfig, presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss'
import { WHAutoComplete, presetMini, transformerWh } from '@bryce-loskie/unocss-preset-mini'

export default defineConfig({
  autocomplete: {
    templates: [
      WHAutoComplete,
    ],
  },
  presets: [
    presetMini(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    transformerWh,
  ],
})
