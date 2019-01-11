import './index.scss'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
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

// we do not use pwa by default
// see https://github.com/NekR/offline-plugin
// if you want it, delete the comments which is about OfflinePlugin in the flowing line and /build/plugins.js
// import * as OfflinePluginRuntime from 'offline-plugin/runtime'
// if (process.env.APP_ENV !== 'dev') {
//     OfflinePluginRuntime.install()
//     OfflinePluginRuntime.applyUpdate()
// }
