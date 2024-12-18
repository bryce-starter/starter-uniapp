import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    formatters: true,
    typescript: true,
    ignores: [
      '**/src/uni_modules',
      '**/node_modules',
      '**/dist',
      '**/pages.json',
    ],
  },
  {
    rules: {
      'antfu/top-level-function': 'off',
      'no-console': 'off',
    },
  },
)
