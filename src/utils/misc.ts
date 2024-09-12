import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

// 检查更新
export const checkForAppUpdate = () => {
  const updateManager = uni.getUpdateManager()
  updateManager.onUpdateReady(() => {
    uni.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启小程序以应用更新',
      showCancel: false,
      confirmText: '重启',
      success({ confirm }) {
        if (!confirm)
          return

        updateManager.applyUpdate()
      },
    })
  })
}

dayjs.extend(duration)

export const calcDuration = (inSeconds: number) => {
  const duration = dayjs.duration(inSeconds, 'seconds')
  const hours = duration.hours()
  const minutes = duration.minutes()
  const seconds = duration.seconds()

  const res: string[] = []
  if (hours)
    res.push(`${hours}小时`)
  if (minutes)
    res.push(`${minutes}分钟`)
  if (seconds)
    res.push(`${seconds}秒`)

  return res.join('')
}
