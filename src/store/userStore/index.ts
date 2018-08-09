import { observable, action, runInAction } from 'mobx'

import { StoreExt } from '@utils/reactExt'
import { routerStore } from './../'

export class UserStore extends StoreExt {
    @observable loading: boolean = false

    @observable isLogin: boolean = false

    @observable loginCategory: string = ''

    @action
    login = async (data): Promise<any> => {
        this.loading = true
        try {
            const res: IUserStore.UserInfo = await this.api.login(data)
            runInAction(() => {
                this.isLogin = true
                this.loginCategory = res.category
            })
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
