// 页面分享
export const shareMixin = {
  onShareAppMessage() {
    return {
      title: 'Starter Uniapp',
      path: '/pages/index/index',
    }
  },
  onShareTimeline() {
    return {
      title: 'Starter Uniapp',
      path: '/pages/index/index',
    }
  },
}
