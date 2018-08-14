import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import { Layout, Menu, Icon } from 'antd'

import menu from './../menu'

import * as styles from './index.scss'

interface IStoreProps {
    routerStore?: RouterStore
    sideBarCollapsed?: boolean
}

@inject(
    (store: IStore): IStoreProps => ({
        routerStore: store.routerStore,
        sideBarCollapsed: store.globalStore.sideBarCollapsed
    })
)
@observer
class Sider extends React.Component<IStoreProps> {
    @observable private menuKeys: string[] = [menu[0].pathname]

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
        const { sideBarCollapsed } = this.props
        return (
            <Layout.Sider trigger={null} collapsible collapsed={sideBarCollapsed}>
                <h2 className={styles.title}>app</h2>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={this.menuKeys.slice()} onClick={this.goto}>
                    {menu.map(m => (
                        <Menu.Item key={m.pathname}>
                            <Icon type={m.iconType} />
                            <span>{m.name}</span>
                        </Menu.Item>
                    ))}
                </Menu>
            </Layout.Sider>
        )
    }
}

export default Sider
