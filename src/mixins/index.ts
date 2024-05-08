// 页面分享
export const shareMixin = {
  onShareAppMessage() {
    return {
      title: 'Sweet Coupons',
      path: '/pages/home/index',
    }
  },
  onShareTimeline() {
    return {
      title: 'Sweet Coupons',
      path: '/pages/home/index',
    }
  },
}
