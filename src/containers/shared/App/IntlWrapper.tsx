import * as React from 'react'
import intl from 'react-intl-universal'
import { find } from 'lodash'
import { Select, LocaleProvider } from 'antd'
import { Locale } from 'antd/lib/locale-provider'

import * as styles from './index.scss'
import { useOnMount } from '@utils/reactExt'
import { setCookie } from '@utils/index'
import { COOKIE_KEYS } from '@constants/index'
import PageLoading from '@components/PageLoading'
import { SUPPOER_LOCALES, LOCALES_KEYS, getLocaleLoader } from '@locales/loader'

interface IProps {
    children?: React.ReactNode
}

export default function IntlWrapper({ children }: IProps) {
    const [currentLocale, setCurrentLocale] = React.useState('')
    const [antdLocaleData, setAntdLocaleData] = React.useState<Locale>(null)

    function loadLocales() {
        let targetLocale = intl.determineLocale({ cookieLocaleKey: COOKIE_KEYS.LANG }) as LOCALES_KEYS
        // default is English
        if (!find(SUPPOER_LOCALES, { value: targetLocale })) {
            targetLocale = LOCALES_KEYS.EN_US
        }
        getLocaleLoader(targetLocale).then(res => {
            intl.init({ currentLocale: targetLocale, locales: { [targetLocale]: res.localeData } }).then(() => {
                setCurrentLocale(targetLocale)
                setAntdLocaleData(res.antdLocaleData)
            })
        })
    }

    function onSelectLocale(val: string) {
        setCookie(COOKIE_KEYS.LANG, val)
        location.reload()
    }

    useOnMount(loadLocales)

    if (!currentLocale) {
        return <PageLoading />
    }
    const selectLanguage = (
        <Select className={styles.intlSelect} onChange={onSelectLocale} value={currentLocale}>
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
                {children}
            </React.Fragment>
        </LocaleProvider>
    )
}
