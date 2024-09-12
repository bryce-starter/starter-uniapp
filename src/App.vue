<script setup lang="ts">
import { useLaunchLog } from './logic/log'
import { checkForAppUpdate } from './utils/misc'

useLaunchLog()

const userStore = useUserStore()
userStore.refreshProfile()

// #ifdef MP-WEIXIN
checkForAppUpdate()
// #endif
</script>

<style>
page {
  background-color: #f5f5f5;
  color: #1d2129;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  box-sizing: border-box;

  --wot-color-theme: $themeColor;
  --wot-navbar-title-font-weight: 400;
  --wot-navbar-title-font-size: 16px;
}

.wd-upload__preview {
  width: 100% !important;
  height: 100% !important;
}
</style>
