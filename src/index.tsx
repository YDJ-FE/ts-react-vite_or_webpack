import './index.scss'

import '@babel/polyfill'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
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

const render = (Component: React.ComponentType) => {
    const element = (
        <Router history={history}>
            <Component />
        </Router>
    )
    ReactDOM.render(element, document.getElementById('app'))
}

render(AppRouter)
