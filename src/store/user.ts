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
  },
  persist: {
    enabled: true,
  },
})
