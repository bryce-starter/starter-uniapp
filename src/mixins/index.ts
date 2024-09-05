import { ShareInfo } from '~/constants'

// 页面分享
export const shareMixin = {
  onShareAppMessage() {
    return ShareInfo
  },
  onShareTimeline() {
    return ShareInfo
  },
}
