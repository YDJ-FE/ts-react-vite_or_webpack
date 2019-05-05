import '@babel/polyfill'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as store from './store'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import { createHashHistory } from 'history'
import { syncHistoryWithStore } from 'mobx-react-router'
import { Router } from 'react-router-dom'
import AppRouter from '@shared/App'
import registerServiceWorker from './sw'
import './index.scss'
import { FormattedMessage } from 'react-intl'
import LanguageProvider from './i18n/LanguageProvider'

registerServiceWorker()
configure({ enforceActions: 'observed' })

const hashHistory = createHashHistory()
const history = syncHistoryWithStore(hashHistory, store.routerStore)

const render = Component => {
    const element = (
        <LanguageProvider>
            <Provider {...store}>
                <Router history={history}>
                    <Component />
                </Router>
            </Provider>
        </LanguageProvider>
    )
    ReactDOM.render(element, document.getElementById('app') as HTMLElement)
}

render(AppRouter)
