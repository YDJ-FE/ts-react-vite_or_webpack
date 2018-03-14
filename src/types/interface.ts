import { AxiosRequestConfig } from 'axios'
export interface AxiosRequestConfig extends AxiosRequestConfig {
    startTime?: Date
}

export interface HttpResquest {
    get?(url, data, baseUrl?): Promise<any>
    post?(url, data, baseUrl?): Promise<any>
    delete?(url, data, baseUrl?): Promise<any>
    put?(url, data, baseUrl?): Promise<any>
}

export interface PlainObject {
    [propName: string]: any
}

export interface BooleanObject {
    [propName: string]: boolean
}
