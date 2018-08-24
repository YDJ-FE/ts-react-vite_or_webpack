import { observable, action } from 'mobx'

import { StoreExt } from '@utils/reactExt'
import { LOCALSTORAGE_KEYS } from '@constants/index'

export class GlobalStore extends StoreExt {
    /**
     * 菜单栏折叠
     *
     * @type {boolean}
     * @memberof GlobalStore
     */
    @observable
    sideBarCollapsed: boolean = false
    /**
     * 菜单栏主题
     *
     * @type {IGlobalStore.SideBarTheme}
     * @memberof GlobalStore
     */
    @observable
    sideBarTheme: IGlobalStore.SideBarTheme = 'light'
    /**
     * 打开的菜单key
     *
     * @type {string[]}
     * @memberof GlobalStore
     */
    @observable
    navOpenKeys: string[] = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.NAV_OPEN_KEYS)) || []

    @action
    toggleSideBarCollapsed = () => {
        this.sideBarCollapsed = !this.sideBarCollapsed
    }

    @action
    changeSiderTheme = (theme: IGlobalStore.SideBarTheme) => {
        this.sideBarTheme = theme
    }

    @action
    setOpenKeys = (openKeys: string[]) => {
        this.navOpenKeys = openKeys
        localStorage.setItem(LOCALSTORAGE_KEYS.NAV_OPEN_KEYS, JSON.stringify(openKeys))
    }
}

export default new GlobalStore()
