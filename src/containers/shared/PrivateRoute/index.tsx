import * as React from 'react'
import { observer } from 'mobx-react'
import { Route, RouteProps } from 'react-router-dom'

import { useOnMount } from '@utils/reactExt'
import useRootStore from '@store/useRootStore'

function PrivateRoute({ component: Component, ...rest }: RouteProps) {
    const { routerStore, authStore } = useRootStore()

    function checkLocalUserInfo() {
        if (!authStore.userInfo.token) {
            routerStore.history.replace('/login')
        }
    }

    useOnMount(checkLocalUserInfo)

    return <Route {...rest} render={props => <Component {...props} {...rest} />} />
}

export default observer(PrivateRoute)
