import axios, { AxiosRequestConfig as _AxiosRequestConfig } from 'axios'
import * as qs from 'qs'
import { message, notification } from 'antd'

import { getCookie } from '@utils/index'
import { COOKIE_KEYS } from '@constants/index'

export interface AxiosRequestConfig extends _AxiosRequestConfig {
    startTime?: Date
}

export interface HttpResquest {
    get?(url, data, baseUrl?): Promise<any>
    post?(url, data, baseUrl?): Promise<any>
    delete?(url, data, baseUrl?): Promise<any>
    put?(url, data, baseUrl?): Promise<any>
}

enum HTTPERROR {
    LOGICERROR,
    TIMEOUTERROR,
    NETWORKERROR
}

let showAuthError = false

const DEFAULTCONFIG = {
    baseURL: process.env.BASEURL
}

const http: HttpResquest = {}
const methods = ['get', 'post', 'put', 'delete']

const isSuccess = res => res.errCode === 0
const resFormat = res => res.response || res.data || {}

methods.forEach(v => {
    http[v] = (url, data, baseUrl?) => {
        const axiosConfig: AxiosRequestConfig = {
            method: v,
            url,
            baseURL: baseUrl || DEFAULTCONFIG.baseURL
        }
        const instance = axios.create(DEFAULTCONFIG)
        // Add a request interceptor
        instance.interceptors.request.use(
            cfg => {
                const ts = Date.now() / 1000
                const queryData = {
                    ts,
                    token: getCookie(COOKIE_KEYS.TOKEN)
                }
                cfg.params = {
                    ...cfg.params,
                    ...queryData
                }
                return cfg
            },
            error => Promise.reject(error)
        )
        // Add a response interceptor
        instance.interceptors.response.use(
            response => {
                if (!showAuthError && response.data.errCode === 402) {
                    showAuthError = true
                    notification.destroy()
                    notification.error({
                        message: '错误',
                        description: '登录已经过期'
                    })
                    setTimeout(() => {
                        showAuthError = false
                        location.href = '#/login'
                    }, 300)
                    return Promise.reject({
                        msg: '登录已过期'
                    })
                }
                if (response.data.errCode === 401) {
                    notification.destroy()
                    notification.error({
                        message: '错误',
                        description: '你没有权限访问'
                    })
                    return Promise.reject({
                        msg: '你没有权限访问'
                    })
                }
                let rdata = null
                if (typeof response.data === 'object' && !isNaN(response.data.length)) {
                    rdata = response.data[0]
                } else {
                    rdata = response.data
                }
                if (!isSuccess(rdata)) {
                    const _err = {
                        msg: rdata.msg,
                        errCode: rdata.errCode,
                        type: HTTPERROR[HTTPERROR.LOGICERROR],
                        config: response.config
                    }
                    return Promise.reject(_err)
                }
                return resFormat(rdata)
            },
            error => {
                const _err = {
                    msg: error.message || '网络故障',
                    type: /^timeout of/.test(error.message)
                        ? HTTPERROR[HTTPERROR.TIMEOUTERROR]
                        : HTTPERROR[HTTPERROR.NETWORKERROR],
                    config: error.config
                }
                return Promise.reject(_err)
            }
        )
        if (v === 'get') {
            axiosConfig.params = data
        } else if (data instanceof FormData) {
            axiosConfig.data = data
        } else {
            axiosConfig.data = qs.stringify(data)
        }
        axiosConfig.startTime = new Date()
        return instance
            .request(axiosConfig)
            .then(res => res)
            .catch(err => {
                message.destroy()
                message.error(err.response || err.msg || err.stack || '未知错误')
                if (axiosConfig.url.includes('autoScript.set')) {
                    return Promise.resolve({
                        err
                    })
                } else {
                    return Promise.reject({
                        err,
                        stack: err.msg || err.stack || ''
                    })
                }
            })
    }
})

export default http
