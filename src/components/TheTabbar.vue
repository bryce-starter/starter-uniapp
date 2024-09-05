<script lang="ts" setup>
import { useRouter } from '@bryce-loskie/use/uni'
import { isDef } from '@bryce-loskie/utils'
import { TabEnum, activeTabRef } from '~/logic/tabbar'

uni.hideTabBar()

const HOME_ROUTE = '/pages/index/index'
const MINE_ROUTE = '/pages/mine/index'

const tabname2route = {
  [TabEnum.Home]: HOME_ROUTE,
  [TabEnum.Mine]: MINE_ROUTE,
}

const route2tabname = {
  [HOME_ROUTE]: TabEnum.Home,
  [MINE_ROUTE]: TabEnum.Mine,
}

const handleChange = () => {
  const route = tabname2route[activeTabRef.value]
  uni.switchTab({ url: route })
}

const router = useRouter()

const init = () => {
  const url = router.currentUrl.value
  if (!url)
    return

  const route = url.replace(/^\/?pages/, '/pages')
  const tab = route2tabname[route as keyof typeof route2tabname]
  if (!isDef(tab))
    return

  activeTabRef.value = tab
}

onLoad(init)
</script>

<template>
  <wd-tabbar
    v-model="activeTabRef"
    fixed
    bordered
    safe-area-inset-bottom
    placeholder
    @change="handleChange"
  >
    <wd-tabbar-item title="Home" icon="home" :name="TabEnum.Home" />
    <wd-tabbar-item title="Mine" icon="user" :name="TabEnum.Mine" />
  </wd-tabbar>
</template>
