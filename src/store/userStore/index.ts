import { observable, action, runInAction } from 'mobx'

import { StoreExt } from '@utils/reactExt'

export class UserStore extends StoreExt {
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

    modifyUser = async (user: IUserStore.IUser) => {
        await this.api.user.modifyUser(user)
    }

    deleteUser = async (_id: string) => {
        await this.api.user.deleteUser({ _id })
        this.getUsers()
    }
}

export default new UserStore()
