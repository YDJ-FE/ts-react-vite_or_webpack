import './styles/app.scss'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import AppRouter from './router'

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('app') as HTMLElement
    )
}

render(AppRouter)

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept(['router'], () => {
        import('./router').then(mod => render(mod.default))
    })
}
