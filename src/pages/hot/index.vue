<script lang="ts" setup>
const tabbarHeightRef = ref(0)
</script>

<template>
  <main>
    hot {{ tabbarHeightRef }}

    <TheTabbar v-model:height="tabbarHeightRef" />
  </main>
</template>
