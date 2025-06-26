<script setup lang="ts">
</script>

<template>
  <main>
    home

    <div class="italic">
      <div class="font-400">
        400
      </div>
      <div class="font-500">
        500
      </div>
      <div class="font-700">
        700
      </div>
      <div class="font-900">
        900
      </div>
    </div>

    <TheTabbar />
  </main>
</template>

<style>
</style>

<route lang="yaml">
style:
  enablePullDownRefresh: true
  onReachBottomDistance: 180
  type: 'home'
</route>
