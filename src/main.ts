import { createSSRApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import { shareMixin } from './mixins'
import store from './store'
import 'uno.css'
import '@unocss/reset/tailwind-compat.css'

export function createApp() {
  const app = createSSRApp(App)

  app.mixin(shareMixin)
  app.use(store)
  app.use(VueQueryPlugin)

  return {
    app,
  }
}
