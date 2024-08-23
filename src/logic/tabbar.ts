import { useIntervalFn } from '@vueuse/core'
import { useElementSize } from '@bryce-loskie/use/uni'

export enum TabEnum {
  Home,
  Hot,
  Mine,
}

export const activeTabRef = ref(TabEnum.Home)

export const useTabbar = () => {
  const { height: heightRef, refresh } = useElementSize('#the-tabbar')

  const MAX_RETRY_COUNT = 5
  const RETRY_INTERVAL = 1000 / 30
  const retryCountRef = ref(0)

  onUnload(() => {
    retryCountRef.value = 0
  })

  const { pause } = useIntervalFn(async () => {
    retryCountRef.value++
    if (retryCountRef.value > MAX_RETRY_COUNT) {
      pause()
      return
    }

    await refresh()
    if (heightRef.value) {
      pause()
    }
  }, RETRY_INTERVAL, { immediateCallback: true })

  uni.hideTabBar()

  return {
    heightRef,
  }
}
