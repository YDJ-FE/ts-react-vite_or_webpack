import * as React from 'react'
import { Layout } from 'antd'
import { AuthorizedRoute } from 'react-authorized'

import * as styles from './index.scss'
import menu from './menu'
import Error from '@components/Error'
import Header from './Header'
import Sider from './Sider'

class Home extends React.Component {
    render() {
        return (
            <Layout>
                <Sider />
                <Layout>
                    <Header />
                    <Layout.Content className={styles.content}>
                        <AuthorizedRoute
                            authorizedRoutes={menu}
                            notFound={Error}
                        />
                    </Layout.Content>
                </Layout>
            </Layout>
        )
    }
}

export default Home
