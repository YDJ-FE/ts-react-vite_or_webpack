import './index.scss'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'

import AppRouter from './router'
import * as store from './store'

configure({ enforceActions: true })

const render = Component => {
    ReactDOM.render(
        <Provider {...store}>
            <AppContainer>
                <Component />
            </AppContainer>
        </Provider>,
        document.getElementById('app') as HTMLElement
    )
}

render(AppRouter)
