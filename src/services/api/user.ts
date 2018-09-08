import http from '@services/http'

export default {
    getUsers(data): Promise<any> {
        return http.get('user', data || {})
    },

    createUser(data): Promise<any> {
        return http.post('user/create', data || {})
    },

    modifyUser(data): Promise<any> {
        return http.post('user/modify', data || {})
    },

    deleteUser(data): Promise<any> {
        return http.post('user/delete', data || {})
    }
}
