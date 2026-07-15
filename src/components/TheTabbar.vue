<script lang="ts" setup>
import { activeTabRef, TabEnum } from '~/logic/tabbar'

defineOptions({
  options: {
    virtualHost: true,
  },
})

const HOME_ROUTE = '/pages/index/index'
const MINE_ROUTE = '/pages/mine/index'

interface TabItem {
  icon: string
  label: string
  name: TabEnum
  path: string
}

const currentTabRef = ref(HOME_ROUTE)
const tabItemsRef = shallowRef<TabItem[]>([
  {
    icon: 'i-lucide-house',
    label: 'Home',
    name: TabEnum.Home,
    path: HOME_ROUTE,
  },
  {
    icon: 'i-lucide-user-round',
    label: 'Mine',
    name: TabEnum.Mine,
    path: MINE_ROUTE,
  },
])

const tabbarStyleRef = computed(() => [
  '--wot-tabbar-height: 50px;',
  '--wot-tabbar-bg: #ffffff;',
  '--wot-tabbar-item-color-active: var(--wot-color-theme);',
  '--wot-tabbar-item-color-inactive: #4e5369;',
].join(' '))

const normalizePath = (value: string) => {
  const path = value.replace(/^#/, '').split('?')[0] || ''
  return path.startsWith('/') ? path : `/${path}`
}

const getCurrentRoutePath = () => {
  let route = ''
  // #ifdef H5
  route = window.location.hash
  // #endif

  if (route)
    return normalizePath(route)

  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  return currentPage?.route ? normalizePath(currentPage.route) : currentTabRef.value
}

const syncCurrentTab = () => {
  const route = getCurrentRoutePath()
  const matchedTab = tabItemsRef.value.find(item => item.path === route)
  if (!matchedTab)
    return

  currentTabRef.value = matchedTab.path
  activeTabRef.value = matchedTab.name
}

const hideNativeTabbar = () => {
  uni.hideTabBar({
    animation: false,
    fail: () => {},
  })
}

const handleChange = ({ value }: { value: string | number }) => {
  const path = String(value)
  if (path === currentTabRef.value)
    return

  const target = tabItemsRef.value.find(item => item.path === path)
  if (!target)
    return

  uni.switchTab({
    url: target.path,
    success: () => {
      currentTabRef.value = target.path
      activeTabRef.value = target.name
      setTimeout(syncCurrentTab, 0)
    },
    fail: () => syncCurrentTab(),
  })
}

const getTabItemStyle = (path: string) => `color: ${currentTabRef.value === path ? ThemeColor : '#4e5369'};`

onShow(() => {
  syncCurrentTab()
  hideNativeTabbar()
  setTimeout(syncCurrentTab, 0)
})

onMounted(() => {
  syncCurrentTab()
  hideNativeTabbar()

  // #ifdef H5
  window.addEventListener('hashchange', syncCurrentTab)
  window.addEventListener('popstate', syncCurrentTab)
  // #endif
})

onUnmounted(() => {
  // #ifdef H5
  window.removeEventListener('hashchange', syncCurrentTab)
  window.removeEventListener('popstate', syncCurrentTab)
  // #endif
})
</script>

<template>
  <wd-tabbar
    :model-value="currentTabRef"
    placeholder bordered safe-area-inset-bottom fixed
    :z-index="100"
    custom-class="starter-tabbar"
    :custom-style="tabbarStyleRef"
    @change="handleChange"
  >
    <wd-tabbar-item
      v-for="item in tabItemsRef"
      :key="item.path"
      :name="item.path"
      custom-class="starter-tabbar-item"
    >
      <view
        class="h-full flex flex-col items-center justify-center gap-1 transition-all"
        :style="getTabItemStyle(item.path)"
      >
        <text class="block h-22px w-22px text-22px" :class="item.icon" />
        <text class="text-12px leading-16px">
          {{ item.label }}
        </text>
      </view>
    </wd-tabbar-item>
  </wd-tabbar>
</template>
