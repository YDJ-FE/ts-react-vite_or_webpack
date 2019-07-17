import './index.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { configure } from 'mobx'

import registerServiceWorker from './sw'
import App from '@shared/App'

registerServiceWorker()
configure({ enforceActions: 'observed' })

const render = (Component: React.ComponentType) => {
    ReactDOM.render(<Component />, document.getElementById('app'))
}

render(App)
