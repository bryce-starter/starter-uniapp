interface IUserStoreState {
  token?: string
}

export const useUserStore = defineStore('user', {
  state(): IUserStoreState {
    return {
      token: undefined,
    }
  },
  actions: {
    setToken(token?: string) {
      this.token = token
    },
  },
  persist: {
    enabled: true,
  },
})
