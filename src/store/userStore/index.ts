import { observable, action, runInAction } from 'mobx'

import { StoreExt } from '@utils/reactExt'
import { routerStore } from './../'

export class UserStore extends StoreExt {
    @observable loading: boolean = false

    @action
    login = async (): Promise<any> => {
        this.loading = true
        try {
            const res: IUserStore.UserInfo = await this.api.getUserInfo({})
            this.$message.success(res.msg)
            routerStore.push('/')
        } catch (err) {}
        runInAction('HIDE_LOGIN_LOADING', () => {
            this.loading = false
        })
    }

    @action
    getError = async (): Promise<any> => {
        try {
            await this.api.getError({})
        } catch (err) {}
    }
}

export default new UserStore()
