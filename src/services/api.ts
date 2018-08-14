import http from '@utils/http'

export function getUserInfo(data): Promise<any> {
    return http.get('/2412/GET/example/haha', data || {})
}

export function getError(data): Promise<any> {
    return http.get('/2412/GET/example/error', data || {})
}

// 登录admin
export function loginAdmin(data): Promise<any> {
    return http.post('/2412/auth/loginAdmin', data || {})
}

// 登录user
export function loginUser(data): Promise<any> {
    return http.post('/2412/auth/loginUser', data || {})
}
