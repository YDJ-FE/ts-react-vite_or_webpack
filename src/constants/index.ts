export enum COOKIE_KEYS {
    token = 'token',
    staffId = 'staff_id'
}

export enum LOCALSTORAGE_KEYS {
    userInfo = 'user_info',
    collapsed = 'menu_collapsed',
    navOpenKeys = 'nav_open_keys'
}

// 七牛相关
export const QN_LOCATION = location.protocol === 'http:' ? 'http://up-z0.qiniu.com' : 'https://up-z0.qbox.me'
export const QN_URL_PREFIX = 'https://ss.yidejia.com/'
