import { makeAutoObservable, observable, runInAction } from 'mobx'
import { TablePaginationConfig } from 'antd/lib/table'

import request from '@utils/request'

export class UserStore {
    constructor() {
        makeAutoObservable(this, { users: observable.ref })
    }
    /**
     * 加载用户列表时的loading
     *
     * @memberof UserStore
     */
    getUsersloading = false
    /**
     * 用户列表
     *
     * @type {IUserStore.IUser[]}
     * @memberof UserStore
     */
    users: IUserStore.IUser[] = []
    /**
     * table pageIndex
     *
     * @memberof UserStore
     */
    pageIndex = 1
    /**
     * table pageSize
     *
     * @memberof UserStore
     */
    pageSize = 30
    /**
     * users total
     *
     * @memberof UserStore
     */
    total = 0

    /**
     * 加载用户列表
     *
     * @memberof UserStore
     */
    getUsers = async () => {
        this.getUsersloading = true
        try {
            const { data } = await request.get('user', {
                params: { pageIndex: this.pageIndex, pageSize: this.pageSize }
            })
            runInAction(() => {
                this.users = data.users
                this.total = data.total
            })
        } finally {
            runInAction(() => {
                this.getUsersloading = false
            })
        }
    }

    createUser = async (user: IUserStore.IUser) => {
        await request.post('user/create', user)
        this.changePageIndex(1)
    }

    modifyUser = async (user: IUserStore.IUser) => {
        const { id, ...rest } = user
        await request.put(`user/${id}`, rest)
        this.getUsers()
    }

    deleteUser = async (id: string) => {
        await request.delete(`user/${id}`)
        this.getUsers()
    }

    changePageIndex = (pageIndex: number) => {
        this.pageIndex = pageIndex
        this.getUsers()
    }

    changePageSize = (pageSize: number) => {
        this.pageSize = pageSize
        this.getUsers()
    }

    handleTableChange = ({ current, pageSize }: TablePaginationConfig) => {
        if (current !== this.pageIndex) {
            this.changePageIndex(current)
        }
        if (pageSize !== this.pageSize) {
            this.changePageSize(pageSize)
        }
    }
}

export default new UserStore()
