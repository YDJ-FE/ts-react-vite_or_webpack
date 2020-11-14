import axios, { AxiosRequestConfig } from 'axios'

import { routerStore } from '@store/index'
import { userInfo } from '@store/authStore/syncUserInfo'
import { get } from 'lodash'

const TIMEOUT = 2 * 60000

// if you want another config, create one!!
const DEFAULTCONFIG: AxiosRequestConfig = {
    baseURL: process.env.BASEURL,
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
            const errMsg = get(error, 'response.data.message')
            if (errMsg === 'invalid token') {
                routerStore.replace('/login')
            }
            return Promise.reject(error)
        }
    )

    return instance
}

export default getAxiosInstance()
