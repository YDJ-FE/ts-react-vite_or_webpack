import http from '@services/http'

export default {
    login(data: PlainObject): Promise<any> {
        return http.post('auth/login', data || {})
    }
}
