import * as React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'

import * as styles from './index.scss'
import menu from './menu'
import Error from '@components/Error'
import Header from './Header'
import Sider from './Sider'

const Home = () => (
    <Layout>
        <Sider />
        <Layout>
            <Header />
            <Layout.Content className={styles.content}>
                <Router>
                    <Switch>
                        {menu.map(m => <Route key={m.pathname} exact path={m.pathname} component={m.component} />)}
                        <Route component={Error} />
                    </Switch>
                </Router>
            </Layout.Content>
        </Layout>
    </Layout>
)

export default Home
