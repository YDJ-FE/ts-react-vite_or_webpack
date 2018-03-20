import * as md5 from 'blueimp-md5'
import { observable, action, runInAction, computed } from 'mobx'

import { StoreExt } from './../../utils/reactExt'
import { setCookie } from './../../utils'
import { COOKIE_KEYS, LOCALSTORAGE_KEYS } from './../../constants'

class UserStore extends StoreExt {
    @observable loading: boolean = false

    @action
    login = async (): Promise<any> => {
        this.loading = true
        try {
            const res = await this.api.getUserInfo({})
            this.$message.success(JSON.stringify(res))
        } catch (err) {}
        runInAction('hideLoading', () => {
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

const userStore = new UserStore()

export { userStore, UserStore }
