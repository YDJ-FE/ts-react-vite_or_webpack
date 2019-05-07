import * as React from 'react'
import intl from 'react-intl-universal'
import { find } from 'lodash'
import { Select, LocaleProvider } from 'antd'

import * as styles from './index.scss'
import { setCookie } from '@utils/index'
import { COOKIE_KEYS } from '@constants/index'
import PageLoading from '@components/PageLoading'
import { SUPPOER_LOCALES, LOCALES_KEYS, getLocaleLoader } from '@locales/loader'

interface IS {
    currentLocale: string
    antdLocaleData: PlainObject
}

export default class IntlWrapper extends React.Component<{}, IS> {
    state = { currentLocale: '', antdLocaleData: null }

    loadLocales() {
        let currentLocale = intl.determineLocale({ cookieLocaleKey: COOKIE_KEYS.LANG })
        // default is English
        if (!find(SUPPOER_LOCALES, { value: currentLocale })) {
            currentLocale = LOCALES_KEYS.EN_US
        }
        getLocaleLoader(currentLocale).then(({ localeData, antdLocaleData }) => {
            intl.init({ currentLocale, locales: { [currentLocale]: localeData } }).then(() => {
                this.setState({ antdLocaleData, currentLocale })
            })
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
        const { currentLocale, antdLocaleData } = this.state
        if (!currentLocale) {
            return <PageLoading />
        }
        const selectLanguage = (
            <Select className={styles.intlSelect} onChange={this.onSelectLocale} value={currentLocale}>
                {SUPPOER_LOCALES.map(l => (
                    <Select.Option key={l.value} value={l.value}>
                        {l.name}
                    </Select.Option>
                ))}
            </Select>
        )
        return (
            <LocaleProvider locale={antdLocaleData}>
                <React.Fragment>
                    {selectLanguage}
                    {this.props.children}
                </React.Fragment>
            </LocaleProvider>
        )
    }
}
