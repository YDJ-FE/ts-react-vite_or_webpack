import { UserStore as UserStoreModel } from './index'

export as namespace IUserStore

export interface UserStore extends UserStoreModel {}

export interface IUser {
    id?: string
    account: string
    password?: string
    category?: string
    createdAt?: string
}
