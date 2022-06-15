import React, { useState } from 'react'
import intl from 'react-intl-universal'
import { find } from 'lodash-es'
import { Select, ConfigProvider } from 'antd'
import { Locale } from 'antd/lib/locale-provider'

import styles from './index.module.scss'
import { useOnMount } from '@utils/hooks'
import { setCookie } from '@utils/index'
import { COOKIE_KEYS } from '@constants/index'
import PageLoading from '@components/PageLoading'
import { SUPPOER_LOCALES, LOCALES_KEYS, getLocaleLoader } from '@locales/loader'

const IntlWrapper: React.ReactFCWithChildren = ({ children }) => {
    const [currentLocale, setCurrentLocale] = useState('')
    const [antdLocaleData, setAntdLocaleData] = useState<Locale>(null)

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
        <ConfigProvider locale={antdLocaleData}>
            <React.Fragment>
                {selectLanguage}
                {children}
            </React.Fragment>
        </ConfigProvider>
    )
}

export default IntlWrapper
