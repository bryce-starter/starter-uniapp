import dayjs from 'dayjs'
import { unref } from 'vue'
import numeral from 'numeral'

export const validateForm = (formRef: any) => {
  return new Promise<void>((resolve, reject) => {
    unref(formRef).validate()
      .then(({ valid }: any) => {
        if (!valid)
          return reject(new Error('表单验证失败，请检查输入内容。'))

        resolve()
      })
  })
}

export const handleNavigateBack = () => {
  // #ifdef H5
  window.history.back()
  // #endif

  // #ifndef H5
  uni.navigateBack().catch(() => {
    uni.redirectTo({ url: '/pages/index/index' })
  })
  // #endif
}

export const getWeixinLoginCode = () => {
  return new Promise<string>((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success: ({ code }) => resolve(code),
      fail: err => reject(err),
    })
  })
}

export const uploadFile = async (filePath: string) => {
  return new Promise<{ data?: { url: string } }>((resolve, reject) => {
    uni.showLoading({
      title: '上传图片检测中...',
      mask: true,
    })
    uni.uploadFile({
      timeout: 30 * 1000,
      url: `https://520qq.cn/cw/api/v1/oss/upload`,
      filePath,
      name: 'file',
      success: (res) => {
        uni.hideLoading()
        const isOk = res.statusCode === 200
        const data = JSON.parse(res.data || '{}')
        if (!isOk) {
          const errorMsg = data.message || '上传失败'
          uni.showModal({
            title: '提示',
            content: errorMsg,
            showCancel: false,
          })
          reject(res)
          return
        }
        resolve(data)
      },
      fail: (err) => {
        uni.hideLoading()
        reject(err)
      },
    })
  })
}

export const handleComingSoon = () => {
  uni.showToast({
    title: '正在完善 ~',
  })
}

export const formatTime = (time: any) => {
  return time ? dayjs(time).format('YYYY-MM-DD HH:mm:ss') : time
}

export const formatPercent = (val?: string | number) => {
  return numeral(val).format('0.000%')
}

export const normalizeNumber = (val?: number) => {
  const num = Number(val)
  if (Number.isNaN(num))
    return 0

  return +(num || 0).toFixed(2)
}

export const formatPrice = (price?: number | string) => {
  const raw = `￥${numeral(price).format('0,0[.]000')}`
  if (raw.includes('.'))
    return raw.replace(/0+$/, '')
  return raw
}
