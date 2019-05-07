import { RouterStore as _RouterStore } from 'mobx-react-router'

declare global {
    /**
     * type from mobx-react-router
     *
     * @interface RouterStore
     * @extends {_RouterStore}
     */
    interface RouterStore extends _RouterStore {}

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
        routerStore: RouterStore
    }
}
