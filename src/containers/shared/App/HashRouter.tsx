import React from 'react'
import { History } from 'history'
import { HashRouterProps as NativeHashRouterProps, Router } from 'react-router-dom'

export interface HashRouterProps extends Omit<NativeHashRouterProps, 'window'> {
    history: History
}

const HashRouter: React.FC<HashRouterProps> = React.memo(props => {
    const { history, ...restProps } = props
    const [state, setState] = React.useState({
        action: history.action,
        location: history.location
    })

    React.useLayoutEffect(() => history.listen(setState), [history])

    return <Router {...restProps} location={state.location} navigationType={state.action} navigator={history} />
})

export default HashRouter
