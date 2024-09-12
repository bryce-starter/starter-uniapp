<script lang="ts" setup>
import { launchAtRef, launchTimeInSecondsRef } from '~/logic/log'

const userStore = useUserStore()

const handleCopyText = (text?: string) => {
  if (!text)
    return

  uni.setClipboardData({ data: text })
}
</script>

<template>
  <main class="box-border page-bg w-screen min-h-screen">
    <wd-navbar
      title="启动日志"
      placeholder
      :bordered="false"
      left-arrow
      safe-area-inset-top
      custom-style="background-color: white !important;"
      @click-left="handleNavigateBack"
    />

    <section class="px-15px pt-12px">
      <ul class="wh-full bg-white p-2 flex-1 rounded-t-3 gap-2 flex flex-col box-border">
        <li class="w-full flex items-center gap-4 rounded-lg px-2 py-3 active:bg-gray-1 box-border transition-all" @click="handleCopyText(userStore.nickname)">
          <div class="i-carbon-user-data text-#7A2ECD text-lg" />
          <div>昵称</div>
          <div class="flex items-center gap-2 mla">
            {{ userStore.nickname || AppName }}
          </div>
        </li>

        <li class="w-full flex items-center gap-4 rounded-lg px-2 py-3 active:bg-gray-1 box-border transition-all" @click="handleCopyText(userStore.userInfo?.id)">
          <div class="i-carbon-user-identification text-#53BFC2 text-lg" />
          <div>UID</div>
          <div class="flex items-center gap-2 mla">
            {{ userStore.userInfo?.id }}
          </div>
        </li>

        <li class="w-full flex items-center gap-4 rounded-lg px-2 py-3 active:bg-gray-1 box-border transition-all">
          <div class="i-carbon-alarm text-#6581EF text-lg" />
          <div>上次启动于</div>
          <text class="flex items-center gap-2 mla" selectable>
            {{ launchAtRef }}
          </text>
        </li>

        <li class="w-full flex items-center gap-4 rounded-lg px-2 py-3 active:bg-gray-1 box-border transition-all">
          <div class="i-game-icons-duration text-#F1A239 text-lg" />
          <div>累计在线时长</div>
          <div class="flex items-center gap-2 mla">
            {{ calcDuration(launchTimeInSecondsRef) }}
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>
