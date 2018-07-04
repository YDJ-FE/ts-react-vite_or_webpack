import axios from 'axios'
import * as qs from 'qs'
import { Message, Notification } from 'element-react'

import { getCookie } from './'
import { COOKIE_KEYS } from '@constants/index'
import { AxiosRequestConfig, HttpResquest } from '../types/http'

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

const isSuccess = res => res.code !== undefined && res.code !== null && Number(res.code) === 1
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
                if (!showAuthError && response.data.code === 402) {
                    showAuthError = true
                    Notification.error({
                        message: '登录已经过期'
                    })
                    setTimeout(() => {
                        showAuthError = false
                        location.href = '#/login'
                    }, 300)
                    return Promise.reject({
                        msg: '登录已过期'
                    })
                }
                if (response.data.code === 401) {
                    Notification.error({
                        message: '你没有权限访问'
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
                        code: rdata.code,
                        type: HTTPERROR[HTTPERROR.LOGICERROR],
                        config: response.config
                    }
                    // cbLogicError && cbLogicError.call(null, _er r);
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
                // cbNetworkError && cbNetworkError.call(null, _err);
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
                err.msg && err.msg.indexOf('</') > 0
                    ? Message({
                          showClose: true,
                          duration: 0,
                          message: err.msg
                      })
                    : Message.error(err.response || err.msg || err.stack || '未知错误')
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
