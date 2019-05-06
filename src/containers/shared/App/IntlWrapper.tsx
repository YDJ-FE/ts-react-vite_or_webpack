import * as React from 'react'
import intl from 'react-intl-universal'
import { find } from 'lodash'
import { Select } from 'antd'

import * as styles from './index.scss'
import { setCookie } from '@utils/index'
import { COOKIE_KEYS } from '@constants/index'
import PageLoading from '@components/PageLoading'

enum LOCALES {
    EN_US = 'en-US',
    ZH_CN = 'zh-CN'
}

const SUPPOER_LOCALES = [
    {
        name: 'English',
        value: LOCALES.EN_US
    },
    {
        name: '简体中文',
        value: LOCALES.ZH_CN
    }
]

export default class IntlWrapper extends React.Component {
    state = { currentLocale: '' }

    getLangLoader(locale: string): Promise<StringObject> {
        switch (locale) {
            case LOCALES.ZH_CN:
                return import(/* webpackChunkName: "zh-CN" */ '@assets/locales/zh-CN.json').then(m => {
                    return m.default
                })
            default:
                return import(/* webpackChunkName: "en-US" */ '@assets/locales/en-US.json').then(m => {
                    return m.default
                })
        }
    }

    loadLocales() {
        let currentLocale = intl.determineLocale({
            urlLocaleKey: 'lang',
            cookieLocaleKey: 'lang'
        })
        // default is English
        if (!find(SUPPOER_LOCALES, { value: currentLocale })) {
            currentLocale = LOCALES.EN_US
        }
        this.getLangLoader(currentLocale)
            .then(data => {
                return intl.init({ currentLocale, locales: { [currentLocale]: data } })
            })
            .then(() => {
                // After loading CLDR locale data, start to render
                this.setState({ currentLocale })
            })
    }

    onSelectLocale = (val: string) => {
        setCookie(COOKIE_KEYS.LANG, val)
        location.reload()
    }

    componentDidMount() {
        this.loadLocales()
    }

    render() {
        const { currentLocale } = this.state
        if (!currentLocale) {
            return <PageLoading />
        }
        const selectLanguage = (
            <Select className={styles.intlSelect} onChange={this.onSelectLocale} value={currentLocale}>
                {SUPPOER_LOCALES.map(locale => (
                    <Select.Option key={locale.value} value={locale.value}>
                        {locale.name}
                    </Select.Option>
                ))}
            </Select>
        )
        return (
            <React.Fragment>
                {selectLanguage}
                {this.props.children}
            </React.Fragment>
        )
    }
}
