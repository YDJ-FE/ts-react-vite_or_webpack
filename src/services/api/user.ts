import http from '@services/http'

export default {
    // 获取用户列表
    getUsers(data): Promise<any> {
        return http.get('user', data || {})
    },

    // 创建user
    createUser(data): Promise<any> {
        return http.post('user/create', data || {})
    }
}
