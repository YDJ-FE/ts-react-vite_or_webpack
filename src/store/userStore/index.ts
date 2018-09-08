import { observable, action, runInAction } from 'mobx'

import { StoreExt } from '@utils/reactExt'
import { routerStore } from './../'
import { setCookie, clearCookie } from '@utils/index'
import { COOKIE_KEYS, LOCALSTORAGE_KEYS } from '@constants/index'
import { IUser } from './type'

export class UserStore extends StoreExt {
    /**
     * 用户信息
     *
     * @type {IUserStore.UserInfo}
     * @memberof UserStore
     */
    @observable
    userInfo: IUserStore.UserInfo = null
    /**
     * 加载用户列表时的loading
     *
     * @type {boolean}
     * @memberof UserStore
     */
    @observable
    getUsersloading: boolean = false
    /**
     * 用户列表
     *
     * @type {IUserStore.IUser[]}
     * @memberof UserStore
     */
    @observable
    users: IUserStore.IUser[] = []

    @action
    login = async (params: IUserStore.LoginParams): Promise<any> => {
        try {
            const res = await this.api.auth.login(params)
            runInAction('SET_USERINFO', () => {
                this.userInfo = res
            })
            setCookie(COOKIE_KEYS.TOKEN, res.token)
            localStorage.setItem(LOCALSTORAGE_KEYS.USERINFO, JSON.stringify(res))
            routerStore.replace('/')
        } catch (err) {
            console.error(err)
        }
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

    /**
     * 加载用户列表
     *
     * @memberof UserStore
     */
    @action
    getUsers = async (pageIndex = 1) => {
        this.getUsersloading = true
        try {
            const res = await this.api.user.getUsers({})
            runInAction('SET_USER_LIST', () => {
                this.users = res
            })
        } catch (err) {}
        runInAction('HIDE_USER_LIST_LOADING', () => {
            this.getUsersloading = false
        })
    }

    createUser = async (user: IUserStore.IUser) => {
        await this.api.user.createUser(user)
    }
}

export default new UserStore()
