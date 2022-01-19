export declare global {
    /**
     * type for all store
     *
     * @interface IStore
     */
    interface IStore {
        authStore: IAuthStore.AuthStore
        userStore: IUserStore.UserStore
        globalStore: IGlobalStore.GlobalStore
        socketStore: ISocketStore.SocketStore
    }
}
