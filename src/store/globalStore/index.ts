import { observable, action } from 'mobx'

import { StoreExt } from '@utils/reactExt'

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

    @action
    toggleSideBarCollapsed = () => {
        this.sideBarCollapsed = !this.sideBarCollapsed
    }

    @action
    changeSiderTheme = (theme: IGlobalStore.SideBarTheme) => {
        this.sideBarTheme = theme
    }
}

export default new GlobalStore()
