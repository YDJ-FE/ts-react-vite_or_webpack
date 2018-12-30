import './index.scss'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import createHashHistory from 'history/createHashHistory'
import { syncHistoryWithStore } from 'mobx-react-router'
import { Router } from 'react-router-dom'

import AppRouter from '@shared/App'
import * as store from './store'

const hashHistory = createHashHistory()
const history = syncHistoryWithStore(hashHistory, store.routerStore)

configure({ enforceActions: 'observed' })

const render = Component => {
    ReactDOM.render(
        <Provider {...store}>
            <Router history={history}>
                <Component />
            </Router>
        </Provider>,
        document.getElementById('app') as HTMLElement
    )
}

render(AppRouter)

if (process.env.APP_ENV !== 'dev') {
    // use pwa
    // see https://github.com/NekR/offline-plugin
    OfflinePluginRuntime.install()
    OfflinePluginRuntime.applyUpdate()
}
