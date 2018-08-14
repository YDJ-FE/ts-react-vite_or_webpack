import { UserStore as UserStoreModel } from './index'

export as namespace IUserStore

export interface UserStore extends UserStoreModel {}

export interface LoginParams {
    category: string
}

export interface UserInfo {
    msg: string
    token: string
    category: string
}
