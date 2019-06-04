import { AuthStore as AuthStoreModel } from './index'

export as namespace IAuthStore

export interface AuthStore extends AuthStoreModel {}

export interface LoginParams {
    account: string
    password: string
}

export interface UserInfo {
    msg?: string
    token?: string
    category?: string
}
