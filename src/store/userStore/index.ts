import { observable, action, runInAction } from 'mobx'
import { PaginationConfig } from 'antd/lib/pagination'

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
     * table pageIndex
     *
     * @type {number}
     * @memberof UserStore
     */
    @observable
    pageIndex: number = 1
    /**
     * table pageSize
     *
     * @type {number}
     * @memberof UserStore
     */
    @observable
    pageSize: number = 30
    /**
     * users total
     *
     * @type {number}
     * @memberof UserStore
     */
    @observable
    total: number = 0

    /**
     * 加载用户列表
     *
     * @memberof UserStore
     */
    @action
    getUsers = async () => {
        this.getUsersloading = true
        try {
            const res = await this.api.user.getUsers({ pageIndex: this.pageIndex, pageSize: this.pageSize })
            runInAction('SET_USER_LIST', () => {
                this.users = res.users
                this.total = res.total
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

    @action
    changePageIndex = (pageIndex: number) => {
        this.pageIndex = pageIndex
        this.getUsers()
    }

    @action
    changePageSize = (pageSize: number) => {
        this.pageSize = pageSize
        this.getUsers()
    }

    handleTableChange = (pagination: PaginationConfig) => {
        const { current, pageSize } = pagination
        if (current !== this.pageIndex) {
            this.changePageIndex(current)
        }
        if (pageSize !== this.pageSize) {
            this.changePageSize(pageSize)
        }
    }
}

export default new UserStore()
