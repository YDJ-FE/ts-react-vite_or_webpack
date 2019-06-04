import { observable, action, reaction } from 'mobx'
import { isPlainObject } from 'lodash'

import { StoreExt } from '@utils/reactExt'
import { routerStore } from './../'
import { initialUserInfo, syncUserInfo } from './syncUserInfo'
import { LOCALSTORAGE_KEYS } from '@constants/index'

export class AuthStore extends StoreExt {
    /**
     * 用户信息
     *
     * @type {IAuthStore.UserInfo}
     * @memberof AuthStore
     */
    @observable
    userInfo: IAuthStore.UserInfo = initialUserInfo

    constructor() {
        super()
        reaction(() => this.userInfo, syncUserInfo)
    }

    @action
    login = async (params: IAuthStore.LoginParams): Promise<any> => {
        try {
            const res = await this.api.auth.login(params)
            this.setUserInfo(isPlainObject(res) ? res : {})
            localStorage.setItem(LOCALSTORAGE_KEYS.USERINFO, JSON.stringify(res))
            routerStore.replace('/')
        } catch (err) {
            console.error(err)
        }
    }

    logout = () => {
        this.setUserInfo({})
        localStorage.removeItem(LOCALSTORAGE_KEYS.USERINFO)
        routerStore.replace('/login')
    }

    /**
     * 初始化用户信息
     *
     * @memberof AuthStore
     */
    @action
    setUserInfo = (userInfo: IAuthStore.UserInfo): IAuthStore.UserInfo => {
        this.userInfo = userInfo
        return userInfo
    }
}

export default new AuthStore()
