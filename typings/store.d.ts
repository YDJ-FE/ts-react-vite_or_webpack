declare interface IStore {
    authStore: IAuthStore.AuthStore
    userStore: IUserStore.UserStore
    globalStore: IGlobalStore.GlobalStore
    routerStore: RouterStore
}
