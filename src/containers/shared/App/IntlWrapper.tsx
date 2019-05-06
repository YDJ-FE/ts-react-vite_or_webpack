import * as React from 'react'
import intl from 'react-intl-universal'
import { find } from 'lodash'
import axios from 'axios'
import { Select } from 'antd'

import * as styles from './index.scss'
import { setCookie } from '@utils/index'
import { COOKIE_KEYS } from '@constants/index'

const SUPPOER_LOCALES = [
    {
        name: 'English',
        value: 'en-US'
    },
    {
        name: '简体中文',
        value: 'zh-CN'
    }
]

export default class IntlWrapper extends React.Component {
    state = { currentLocale: '' }

    loadLocales() {
        let currentLocale = intl.determineLocale({
            urlLocaleKey: 'lang',
            cookieLocaleKey: 'lang'
        })
        // default is English
        if (!find(SUPPOER_LOCALES, { value: currentLocale })) {
            currentLocale = 'en-US'
        }
        axios
            .get(`public/locales/${currentLocale}.json`)
            .then(res => {
                // init 方法将根据 currentLocale 来加载当前语言环境的数据
                return intl.init({
                    currentLocale,
                    locales: { [currentLocale]: res.data }
                })
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
        const selectLanguage = currentLocale ? (
            <Select className={styles.intlSelect} onChange={this.onSelectLocale} value={currentLocale}>
                {SUPPOER_LOCALES.map(locale => (
                    <Select.Option key={locale.value} value={locale.value}>
                        {locale.name}
                    </Select.Option>
                ))}
            </Select>
        ) : null
        return (
            <React.Fragment>
                {selectLanguage}
                {this.props.children}
            </React.Fragment>
        )
    }
}
