<script setup lang="ts">
definePage({
  style: {
    enablePullDownRefresh: true,
    onReachBottomDistance: 180,
    type: 'home',
  },
})
</script>

<template>
  <main>
    home

    <h2>foo</h2>

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
