import * as React from 'react'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import { Route, RouteProps } from 'react-router-dom'

import { useOnMount } from '@utils/reactExt'

export interface IStoreProps {
    routerStore?: RouterStore
    userInfo?: IAuthStore.UserInfo
}

function PrivateRoute({ userInfo, component: Component, ...rest }: IStoreProps & RouteProps) {
    function checkLocalUserInfo() {
        if (!userInfo.token) {
            rest.routerStore.history.replace('/login')
        }
    }

    useOnMount(checkLocalUserInfo)

    return <Route {...rest} render={props => <Component {...props} {...rest} />} />
}

export default inject(
    (store: IStore): IStoreProps => {
        const { routerStore, authStore } = store
        const { userInfo } = authStore
        return { routerStore, userInfo }
    }
)(observer(PrivateRoute))
