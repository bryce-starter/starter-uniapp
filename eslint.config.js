const antfu = require('@antfu/eslint-config').default

module.exports = antfu(
  {
    vue: true,
    typescript: true,
    ignores: [
      '**/src/uni_modules',
      '**/node_modules',
      '**/dist',
    ],
  },
  {
    rules: {
      'antfu/top-level-function': 'off',
      'no-console': 'off',
    },
  },
)
