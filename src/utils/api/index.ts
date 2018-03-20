import http from './http'

export function getUserInfo(data): Promise<any> {
    return http.get('/2412/GET/example/haha', data || {})
}

export function getError(data): Promise<any> {
    return http.get('/2412/GET/example/error', data || {})
}
