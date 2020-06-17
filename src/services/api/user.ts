import http from '@services/http'

export default {
    getUsers(data: PlainObject): Promise<any> {
        return http.get('user', data || {})
    },

    createUser(data: PlainObject): Promise<any> {
        return http.post('user/create', data || {})
    },

    modifyUser(data: PlainObject): Promise<any> {
        return http.post('user/modify', data || {})
    },

    deleteUser(data: PlainObject): Promise<any> {
        return http.post('user/delete', data || {})
    }
}
