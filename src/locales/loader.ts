import { Locale } from 'antd/lib/locale-provider'

export enum LOCALES_KEYS {
    EN_US = 'en-US',
    ZH_CN = 'zh-CN'
}

export const SUPPOER_LOCALES = [
    {
        name: 'English',
        value: LOCALES_KEYS.EN_US
    },
    {
        name: '简体中文',
        value: LOCALES_KEYS.ZH_CN
    }
]

export interface LocaleResponse {
    localeData: StringObject
    antdLocaleData: Locale
}

export function getLocaleLoader(locale: string): Promise<LocaleResponse> {
    switch (locale) {
        case LOCALES_KEYS.ZH_CN:
            return new Promise(async resolve => {
                const loc = await import(/* webpackChunkName: "zh-CN" */ './zh_CN.json').then(m => m.default)
                const antdLoc = await import(
                    /* webpackChunkName: "antd-zh-CN" */ 'antd/lib/locale-provider/zh_CN'
                ).then(m => m.default)
                resolve({ localeData: loc, antdLocaleData: antdLoc })
            })
        default:
            return new Promise(async resolve => {
                const loc = await import(/* webpackChunkName: "en-US" */ './en_US.json').then(m => m.default)
                const antdLoc = await import(
                    /* webpackChunkName: "antd-en-US" */ 'antd/lib/locale-provider/en_US'
                ).then(m => m.default)
                resolve({ localeData: loc, antdLocaleData: antdLoc })
            })
    }
}
