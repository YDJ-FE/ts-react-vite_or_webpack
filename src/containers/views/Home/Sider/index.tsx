import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import { Layout, Menu, Icon } from 'antd'
import { checkPermissions } from 'react-authorized/lib'

import menu from './sideMenuConfig'

import * as styles from './index.scss'

interface IStoreProps {
    sideBarCollapsed?: boolean
    userInfo?: IUserStore.UserInfo
    routerStore?: RouterStore
}

@inject(
    (store: IStore): IStoreProps => ({
        routerStore: store.routerStore,
        sideBarCollapsed: store.globalStore.sideBarCollapsed,
        userInfo: store.userStore.userInfo
    })
)
@observer
class Sider extends React.Component<IStoreProps> {
    @observable
    private menuKeys: string[] = [menu[0].title]

    constructor(props) {
        super(props)
        this.setMenuKeys()
    }

    goto = ({ key }) => {
        const { history, location } = this.props.routerStore
        if (location.pathname === key) {
            return
        }
        history.push(key)
    }

    @action
    setMenuKeys() {
        const { location } = this.props.routerStore
        this.menuKeys = [location.pathname]
    }

    render() {
        const { userInfo, sideBarCollapsed } = this.props
        const renderMenuItem = menuArray => {
            return menuArray.map(item => {
                if (!checkPermissions(userInfo.category, item.permissions)) {
                    return false
                }

                return (
                    <Menu.Item key={item.path}>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </Menu.Item>
                )
            })
        }
        return (
            <Layout.Sider trigger={null} collapsible collapsed={sideBarCollapsed}>
                <h2 className={styles.title}>app</h2>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={this.menuKeys.slice()} onClick={this.goto}>
                    {renderMenuItem(menu)}
                </Menu>
            </Layout.Sider>
        )
    }
}

export default Sider
