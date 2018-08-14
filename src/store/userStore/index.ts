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
            let res: IUserStore.UserInfo = null
            if (data.category === 'user') {
                res = await this.api.loginUser(data)
            } else {
                res = await this.api.loginAdmin(data)
            }
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
    logout = () => {
        this.isLogin = false
        this.loginCategory = ''
        routerStore.replace('/login')
    }

    @action
    getError = async (): Promise<any> => {
        try {
            await this.api.getError({})
        } catch (err) {}
    }
}

export default new UserStore()
