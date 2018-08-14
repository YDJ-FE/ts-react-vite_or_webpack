import * as React from 'react'
import { Layout } from 'antd'
import { inject, observer } from 'mobx-react'
import { AuthorizedRoute } from 'react-authorized'

import * as styles from './index.scss'
import Error from '@components/Error'
import menu from './menu'
import Header from './Header'
import Sider from './Sider'

interface IStoreProps {
    userInfo?: IUserStore.UserInfo
    logout?: () => void
}

@inject(
    (store: IStore): IStoreProps => {
        const { userInfo, logout } = store.userStore
        return {
            userInfo,
            logout
        }
    }
)
@observer
class Home extends React.Component<IStoreProps> {
    render() {
        const { userInfo, logout } = this.props
        return (
            <Layout>
                <Sider />
                <Layout>
                    <Header logout={logout} />
                    <Layout.Content className={styles.content}>
                        <AuthorizedRoute authorities={userInfo.category} authorizedRoutes={menu} notFound={Error} />
                    </Layout.Content>
                </Layout>
            </Layout>
        )
    }
}

export default Home
