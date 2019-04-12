import './index.scss'

import '@babel/polyfill'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import { createHashHistory } from 'history'
import { syncHistoryWithStore } from 'mobx-react-router'
import { Router } from 'react-router-dom'

import registerServiceWorker from './sw'
import AppRouter from '@shared/App'
import * as store from './store'

registerServiceWorker()
configure({ enforceActions: 'observed' })

const hashHistory = createHashHistory()
const history = syncHistoryWithStore(hashHistory, store.routerStore)

const render = Component => {
    const element = (
        <Provider {...store}>
            <Router history={history}>
                <Component />
            </Router>
        </Provider>
    )
    ReactDOM.render(element, document.getElementById('app') as HTMLElement)
}

render(AppRouter)
