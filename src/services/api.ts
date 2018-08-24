import http from '@utils/http'

// 登录
export function login(data): Promise<any> {
    return http.post('/2412/auth/loginAdmin', data || {})
}
