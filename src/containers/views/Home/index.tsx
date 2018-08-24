import * as React from 'react'
import { Layout } from 'antd'
import { inject, observer } from 'mobx-react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import * as styles from './index.scss'
import Error from '@components/Error'
import menu, { asyncComponents } from './menu'
import Header from './Header'
import Sider from './Sider'

interface IStoreProps {
    logout?: () => void
}

function Home({ logout }: IStoreProps) {
    return (
        <Layout>
            <Sider />
            <Layout>
                <Header logout={logout} />
                <Layout.Content className={styles.content}>
                    <Router>
                        <Switch>
                            {menu.map(m => {
                                if (!m.path) {
                                    return null
                                }
                                return (
                                    <Route
                                        key={m.id}
                                        exact={m.exact}
                                        path={m.path}
                                        component={m.component ? asyncComponents[m.component] : null}
                                    />
                                )
                            })}
                            <Route component={Error} />
                        </Switch>
                    </Router>
                </Layout.Content>
            </Layout>
        </Layout>
    )
}

export default inject(
    (store: IStore): IStoreProps => {
        const { logout } = store.userStore
        return { logout }
    }
)(observer(Home))
