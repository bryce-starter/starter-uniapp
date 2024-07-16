<script lang="ts" setup>
import { TabEnum, activeTabRef } from '~/logic/sys'

uni.hideTabBar()

const handleChange = () => {
  switch (activeTabRef.value) {
    case TabEnum.Home:
      uni.switchTab({ url: '/pages/index/index' })
      break
    case TabEnum.Hot:
      uni.switchTab({ url: '/pages/hot/index' })
      break
    case TabEnum.Mine:
      uni.switchTab({ url: '/pages/mine/index' })
      break
  }
}
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
    <wd-tabbar-item title="Home" icon="cart" :name="TabEnum.Hot" />
    <wd-tabbar-item title="Mine" icon="user" :name="TabEnum.Mine" />
  </wd-tabbar>
</template>
