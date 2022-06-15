import 'antd/dist/antd.less'
import './index.scss'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { configure } from 'mobx'

import App from '@shared/App'
import catchUnhandledRejection from './errorHandler'

configure({ enforceActions: 'observed' })
catchUnhandledRejection()

const render = (Component: React.ComponentType) => {
    const root = createRoot(document.getElementById('app'))
    root.render(<Component />)
}

render(App)
