import { observable, action } from 'mobx'

import { StoreExt } from '@utils/reactExt'

export class GlobalStore extends StoreExt {
    @observable sideBarCollapsed: boolean = false

    @action
    toggleSideBarCollapsed = () => {
        this.sideBarCollapsed = !this.sideBarCollapsed
    }
}

export default new GlobalStore()
