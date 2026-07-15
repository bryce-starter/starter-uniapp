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
  <main class="box-border min-h-screen w-screen page-bg">
    <wd-navbar
      title="启动日志"

      :bordered="false"

      placeholder safe-area-inset-top left-arrow
      custom-style="background-color: white !important;"
      @click-left="handleNavigateBack"
    />

    <section class="px-15px pt-12px">
      <ul class="box-border h-full w-full flex flex-1 flex-col gap-2 rounded-t-3 bg-white p-2">
        <li class="box-border w-full flex items-center gap-4 rounded-lg px-2 py-3 transition-all active:bg-gray-1" @click="handleCopyText(userStore.nickname)">
          <div class="i-lucide-user-round text-lg text-#7A2ECD" />
          <div>昵称</div>
          <div class="ml-auto flex items-center gap-2">
            {{ userStore.nickname || AppName }}
          </div>
        </li>

        <li class="box-border w-full flex items-center gap-4 rounded-lg px-2 py-3 transition-all active:bg-gray-1" @click="handleCopyText(userStore.userInfo?.id)">
          <div class="i-lucide-fingerprint text-lg text-#53BFC2" />
          <div>UID</div>
          <div class="ml-auto flex items-center gap-2">
            {{ userStore.userInfo?.id }}
          </div>
        </li>

        <li class="box-border w-full flex items-center gap-4 rounded-lg px-2 py-3 transition-all active:bg-gray-1">
          <div class="i-lucide-clock text-lg text-#6581EF" />
          <div>上次启动于</div>
          <text class="ml-auto flex items-center gap-2" selectable>
            {{ launchAtRef }}
          </text>
        </li>

        <li class="box-border w-full flex items-center gap-4 rounded-lg px-2 py-3 transition-all active:bg-gray-1">
          <div class="i-lucide-timer text-lg text-#F1A239" />
          <div>累计在线时长</div>
          <div class="ml-auto flex items-center gap-2">
            {{ calcDuration(launchTimeInSecondsRef) }}
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>
