import { uuid } from '@bryce-loskie/utils'
import { useUserStore } from '~/store/user'

// #ifndef H5
// @ts-expect-error ignore
export const BASE_URL = 'https://foo.bar/api'
// #endif

// #ifdef H5
// @ts-expect-error ignore
// eslint-disable-next-line ts/no-redeclare
export const BASE_URL = '/api'
// #endif

const httpInterceptor = {
  // 拦截前触发
  invoke(options: any) {
    // 1. 非 http 开头需拼接地址
    if (!options.url.startsWith('http'))
      options.url = BASE_URL + options.url

    // 2. 请求超时, 默认 10s
    options.timeout = 30 * 1000

    // 3. 添加小程序端请求头标识
    options.header = {
      ...options.header,
      'x-requestId': uuid(),
    }

    // 4. 添加 token 请求头标识
    const token = useUserStore().token
    if (token)
      options.header.Authorization = token
  },
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

const handleTokenExpired = async () => {
  // pass
}

export const http = <T = any>(options: UniApp.RequestOptions) => {
  return new Promise<T>((resolve, reject) => {
    uni.request({
      ...options,
      // 响应成功
      async success(res: any) {
        const { statusCode, data } = res || {}
        const dataCode = data?.code
        const dataMsg = data?.msg === 'internal server error' ? '服务器开小差了，请稍后重试' : data?.msg

        const isTokenExpired = dataCode === 1001
        if (isTokenExpired) {
          await handleTokenExpired()
          return reject(res)
        }

        // 状态码 2xx， axios 就是这样设计的
        if (statusCode >= 200 && statusCode < 300 && dataCode === 0)
          return resolve(data)

        if ([401, 403].includes(statusCode)) {
          await handleTokenExpired()
          return reject(res)
        }

        // 其他错误 -> 根据后端错误信息轻提示
        uni.showToast({
          icon: 'none',
          title: dataMsg || data?.message || '请求错误',
        })
        reject(res)
      },
      // 响应失败
      fail(err: any) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，请稍后重试',
        })
        reject(err)
      },
    })
  })
}
