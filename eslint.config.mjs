import uni from '@uni-helper/eslint-config'

export default uni(
  {
    unocss: true,
  },
  {
    ignores: [
      '**/dist',
      '**/node_modules',
      '**/pages.json',
      '**/manifest.json',
      '**/src/uni_modules',
    ],
    rules: {
      'antfu/top-level-function': 'off',
      'no-console': 'off',
    },
  },
)
