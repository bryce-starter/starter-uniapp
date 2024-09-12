import type { IUser } from '~/api/user'

interface IUserStoreState {
  token?: string
  userInfo?: IUser
}

export const useUserStore = defineStore('user', {
  state(): IUserStoreState {
    return {
      token: undefined,
      userInfo: undefined,
    }
  },
  actions: {
    setToken(token?: string) {
      this.token = token
    },
    setUserInfo(userInfo?: IUser) {
      this.userInfo = userInfo
    },
    logout() {
      this.token = undefined
      this.userInfo = undefined
    },
    async refreshProfile() {
      // TODO: 刷新用户信息
    },
  },
  getters: {
    nickname(state) {
      return state.userInfo?.nickname
    },
    hasLoggedIn(state) {
      return !!state.token
    },
    avatar(state) {
      const avatarFilename = state.userInfo?.avatar
      if (!avatarFilename)
        return DefaultAvatarUrl

      const httpPrefix = /^https?:\/\//i
      if (httpPrefix.test(avatarFilename))
        return avatarFilename
      else
        return BASE_URL + avatarFilename
    },
  },
  persist: {
    enabled: true,
  },
})
