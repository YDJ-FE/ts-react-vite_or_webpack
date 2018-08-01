import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import { Layout, Menu, Icon } from 'antd'

import menu from './../menu'

import * as styles from './index.scss'

interface IP {
    globalStore?: IGlobalStore.GlobalStore
    routerStore?: RouterStore
}

@inject('globalStore', 'routerStore')
@observer
class Sider extends React.Component<IP> {
    @observable private menuKeys: string[] = [menu[0].path]

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
        const { sideBarCollapsed } = this.props.globalStore
        return (
            <Layout.Sider trigger={null} collapsible collapsed={sideBarCollapsed}>
                <h2 className={styles.title}>app</h2>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={this.menuKeys.slice()} onClick={this.goto}>
                    {menu.map(m => (
                        <Menu.Item key={m.path}>
                            <Icon type={m.iconType} />
                            <span>{m.pathName}</span>
                        </Menu.Item>
                    ))}
                </Menu>
            </Layout.Sider>
        )
    }
}

export default Sider
