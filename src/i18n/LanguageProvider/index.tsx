import * as React from 'react'
import * as enLocaleData from 'react-intl/locale-data/en'
import * as esLocaleData from 'react-intl/locale-data/es'
import { addLocaleData, IntlProvider } from 'react-intl'
import { LocaleProvider } from 'antd'
import enMessages from '../translations/en-US.json'
import esMessages from '../translations/es-ES.json'
import enUSAnt from 'antd/lib/locale-provider/en_US'
import esESAnt from 'antd/lib/locale-provider/es_ES'

addLocaleData(enLocaleData)
addLocaleData(esLocaleData)

const messages: {
    [key: string]: {}
} = {
    en: enMessages,
    es: esMessages
}

const ANT_LANG_PACKAGE = {
    en: enUSAnt,
    es: esESAnt
}

export default class LanguageProvider extends React.Component<{ locale?: string }> {
    state: { locale: string } = { locale: 'en' }

    render() {
        const { locale } = this.state
        return (
            <LocaleProvider locale={ANT_LANG_PACKAGE[locale]}>
                <IntlProvider locale={locale} messages={messages[locale]}>
                    {this.props.children}
                </IntlProvider>
            </LocaleProvider>
        )
    }
}
