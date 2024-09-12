import { useIntervalFn } from '@vueuse/core'
import dayjs from 'dayjs'

export const launchAtRef = ref<string>()

export const launchTimeInSecondsRef = ref<number>(0)

export const disposeLaunchLog = () => {
  launchAtRef.value = undefined
  launchTimeInSecondsRef.value = 0
}

export const useLaunchLog = () => {
  onLaunch(() => {
    launchAtRef.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
  })

  const { pause, resume } = useIntervalFn(() => {
    launchTimeInSecondsRef.value++
  }, 1 * 1000)

  onShow(resume)
  onHide(pause)
  onUnload(disposeLaunchLog)
}
