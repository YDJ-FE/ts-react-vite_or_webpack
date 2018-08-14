import * as React from 'react'
import { Layout } from 'antd'
import {inject, observer} from 'mobx-react'
import { AuthorizedRoute } from 'react-authorized'

import * as styles from './index.scss'
import menu from './menu'
import Error from '@components/Error'
import Header from './Header'
import Sider from './Sider'

interface Props {
    userStore?: IUserStore.UserStore
}

@inject('userStore')
@observer
class Home extends React.Component<Props> {
    render() {
        return (
            <Layout>
                <Sider />
                <Layout>
                    <Header logout={this.props.userStore.logout}/>
                    <Layout.Content className={styles.content}>
                        <AuthorizedRoute
                            authorities={this.props.userStore.loginCategory}
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
