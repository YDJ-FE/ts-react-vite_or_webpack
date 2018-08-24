import { observable, action, runInAction } from 'mobx'

import { StoreExt } from '@utils/reactExt'
import { routerStore } from './../'
import { setCookie, clearCookie } from '@utils/index'
import { COOKIE_KEYS, LOCALSTORAGE_KEYS } from '@constants/index'

export class UserStore extends StoreExt {
    /**
     * 用户信息
     *
     * @type {IUserStore.UserInfo}
     * @memberof UserStore
     */
    @observable
    userInfo: IUserStore.UserInfo = null

    @action
    login = async (params: IUserStore.LoginParams): Promise<any> => {
        try {
            const res = await this.api.login(params)
            runInAction('SET_USERINFO', () => {
                this.userInfo = res
            })
            setCookie(COOKIE_KEYS.TOKEN, res.token)
            localStorage.setItem(LOCALSTORAGE_KEYS.USERINFO, JSON.stringify(res))
            routerStore.push('/')
        } catch (err) {}
    }

    @action
    logout = () => {
        clearCookie(COOKIE_KEYS.TOKEN)
        localStorage.removeItem(LOCALSTORAGE_KEYS.USERINFO)
        routerStore.replace('/login')
    }

    /**
     * 初始化用户信息
     *
     * @memberof YKBUserStore
     */
    @action
    initUserInfo = (): IUserStore.UserInfo => {
        const lcoalUserInfo = localStorage.getItem(LOCALSTORAGE_KEYS.USERINFO)
        if (!lcoalUserInfo) {
            throw new Error('no local userinfo!!')
        }
        const userInfo: IUserStore.UserInfo = JSON.parse(lcoalUserInfo)
        this.userInfo = userInfo
        return userInfo
    }
}

export default new UserStore()
