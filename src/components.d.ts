/* eslint-disable */
// @ts-nocheck
import type { DefineComponent } from 'vue'

export {}

type AnyComponent = DefineComponent<any, any, any>

declare module 'vue' {
  export interface GlobalComponents {
    TheTabbar: typeof import('./components/TheTabbar.vue')['default']
    WdNavbar: AnyComponent
  }
}
