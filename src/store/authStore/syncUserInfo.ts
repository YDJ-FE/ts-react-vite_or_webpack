import { LOCALSTORAGE_KEYS } from '@constants/index'

export const initialUserInfo = (() => {
    const localUserInfo = localStorage.getItem(LOCALSTORAGE_KEYS.USERINFO)
    const _userInfo: IAuthStore.UserInfo = localUserInfo ? JSON.parse(localUserInfo) : {}
    return _userInfo
})()

export let userInfo: IAuthStore.UserInfo = initialUserInfo

/**
 * syncUserInfo for http
 *
 * @export
 * @param {IAuthStore.UserInfo} data
 */
export function syncUserInfo(data: IAuthStore.UserInfo) {
    userInfo = data
}
