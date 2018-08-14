import * as React from 'react'
import { hot } from 'react-hot-loader'
import Loadable from 'react-loadable'
import { inject, observer } from 'mobx-react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import * as styles from './index.scss'
import PageLoading from '@components/PageLoading'
import Error from '@components/Error'

const Home = Loadable({
    loader: () => import(/* webpackChunkName: "home" */ '@views/Home'),
    loading: PageLoading
})
const Login = Loadable({
    loader: () => import(/* webpackChunkName: "login" */ '@views/Login'),
    loading: PageLoading
})

interface IStoreProps {
    isLogin?: boolean
}

// 权限控制
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            rest.isLogin ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
)

const AppWrapper = props => <div className={styles.appWrapper}>{props.children}</div>
@inject(
    (store: IStore): IStoreProps => ({
        isLogin: store.userStore.isLogin
    })
)
@observer
class AppRouter extends React.Component<IStoreProps> {
    render() {
        const { isLogin } = this.props
        return (
            <AppWrapper>
                <Router>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <PrivateRoute isLogin={isLogin} path="/" component={Home} />
                        <Route component={Error} />
                    </Switch>
                </Router>
            </AppWrapper>
        )
    }
}

export default hot(module)(AppRouter)
