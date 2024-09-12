import type { ConfigProviderThemeVars } from 'wot-design-uni'

export {}

declare global {
  export type ThemeVars = ConfigProviderThemeVars

  export interface IPagePayload {
    page?: number
    pageSize?: number
  }

  export interface IRes<T> {
    message: string
    data: T
  }

  export interface IListRes<T> {
    data: {
      list: T[]
      count: number
    }
  }

  export interface IPageRes<T> {
    data: {
      list: T[]
      total: number
      page: number
      pageSize: number
      hasMore: boolean
    }
  }
}
