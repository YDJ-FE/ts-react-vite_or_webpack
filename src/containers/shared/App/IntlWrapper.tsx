import * as React from 'react'
import intl from 'react-intl-universal'
import { find } from 'lodash'
import axios from 'axios'

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
    loadLocales() {
        let currentLocale = intl.determineLocale({
            urlLocaleKey: 'lang',
            cookieLocaleKey: 'lang'
        })
        // default is Chinese
        if (!find(SUPPOER_LOCALES, { value: currentLocale })) {
            currentLocale = 'zh-CN'
        }
        axios.get(`public/locales/${currentLocale}.json`).then(res => {
            // init 方法将根据 currentLocale 来加载当前语言环境的数据
            return intl.init({
                currentLocale,
                locales: { [currentLocale]: res.data }
            })
        })
    }

    componentDidMount() {
        this.loadLocales()
    }

    render() {
        return this.props.children
    }
}
