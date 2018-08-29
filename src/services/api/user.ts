import http from '@services/http'

export default {
    // 登录
    getUsers(data): Promise<any> {
        return http.get('user', data || {})
    }
}
