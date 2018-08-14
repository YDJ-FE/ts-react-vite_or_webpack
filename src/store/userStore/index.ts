import { observable, action, runInAction } from 'mobx'

import { StoreExt } from '@utils/reactExt'
import { routerStore } from './../'
import { setCookie, clearCookie } from '@utils/index'
import { COOKIE_KEYS, LOCALSTORAGE_KEYS } from '@constants/index'

export class UserStore extends StoreExt {
    @observable
    loading: boolean = false
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
        this.loading = true
        try {
            const { loginUser, loginAdmin } = this.api
            const api = params.category === 'user' ? loginUser : loginAdmin
            const res = await api(params)
            runInAction('SET_USERINFO', () => {
                this.userInfo = res
            })
            setCookie(COOKIE_KEYS.TOKEN, res.token)
            localStorage.setItem(LOCALSTORAGE_KEYS.USERINFO, JSON.stringify(res))
            routerStore.push('/')
        } catch (err) {}
        runInAction('HIDE_LOGIN_LOADING', () => {
            this.loading = false
        })
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

    @action
    getError = async (): Promise<any> => {
        try {
            await this.api.getError({})
        } catch (err) {}
    }
}

export default new UserStore()
