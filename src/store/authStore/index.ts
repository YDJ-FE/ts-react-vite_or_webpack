import { makeAutoObservable, action, reaction } from 'mobx'
import { isPlainObject } from 'lodash-es'

import { initialUserInfo, syncUserInfo } from './syncUserInfo'
import { LOCALSTORAGE_KEYS } from '@constants/index'
import request from '@utils/request'
import history from '@shared/App/ht'

export class AuthStore {
    /**
     * 用户信息
     *
     * @type {IAuthStore.UserInfo}
     * @memberof AuthStore
     */
    userInfo: IAuthStore.UserInfo = initialUserInfo

    constructor() {
        makeAutoObservable(this)
        reaction(() => this.userInfo, syncUserInfo)
    }

    @action
    login = async (params: IAuthStore.LoginParams) => {
        const { data } = await request.post<IAuthStore.UserInfo>('auth/login', params)
        this.setUserInfo(isPlainObject(data) ? data : null)
        localStorage.setItem(LOCALSTORAGE_KEYS.USERINFO, JSON.stringify(data))
        history.replace('/')
    }

    logout = () => {
        this.setUserInfo(null)
        localStorage.removeItem(LOCALSTORAGE_KEYS.USERINFO)
        history.replace('/login')
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
