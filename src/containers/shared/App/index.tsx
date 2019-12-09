import React from 'react'
import loadable from '@loadable/component'
import { HashRouter, Router, Switch, Route } from 'react-router-dom'
import { createHashHistory } from 'history'
import { syncHistoryWithStore } from 'mobx-react-router'

import styles from './index.scss'
import * as store from '@store/index'
import PageLoading from '@components/PageLoading'
import Error from '@components/Error'
import Provider from './Provider'
import IntlWrapper from './IntlWrapper'

const hashHistory = createHashHistory()
const history = syncHistoryWithStore(hashHistory, store.routerStore)

const loadableOptions = { fallback: <PageLoading /> }
const Home = loadable(() => import(/* webpackChunkName: "home" */ '@views/Home'), loadableOptions)
const Login = loadable(() => import(/* webpackChunkName: "login" */ '@views/Login'), loadableOptions)

const AppWrapper = ({ children }: { children?: React.ReactNode }) => <div className={styles.appWrapper}>{children}</div>

function App() {
    return (
        <Provider>
            <IntlWrapper>
                <AppWrapper>
                    <Router history={history}>
                        <HashRouter>
                            <Switch>
                                <Route exact path="/login" component={Login} />
                                <Route path="/" component={Home} />
                                <Route component={Error} />
                            </Switch>
                        </HashRouter>
                    </Router>
                </AppWrapper>
            </IntlWrapper>
        </Provider>
    )
}

export default App
