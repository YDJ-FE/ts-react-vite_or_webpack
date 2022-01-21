import axios, { AxiosRequestConfig } from 'axios'

import { userInfo } from '@store/authStore/syncUserInfo'
import history from '@shared/App/ht'

const TIMEOUT = 2 * 60000

// if you want another config, create one!!
const DEFAULTCONFIG: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_BASEURL,
    timeout: TIMEOUT
}

const NO_NEED_AUTH_URLS = ['auth/login']

function getAxiosInstance() {
    const instance = axios.create(DEFAULTCONFIG)
    instance.interceptors.request.use(config => {
        if (!NO_NEED_AUTH_URLS.includes(config.url) && userInfo?.token) {
            config.headers['Authorization'] = `Bearer ${userInfo.token}`
        }
        return config
    })
    instance.interceptors.response.use(
        function (response) {
            return response.data
        },
        function (error) {
            if (error?.response?.data?.message === 'invalid token' || error?.response?.status === 401) {
                history.replace('/login')
            }
            return Promise.reject(error)
        }
    )

    return instance
}

export default getAxiosInstance()
