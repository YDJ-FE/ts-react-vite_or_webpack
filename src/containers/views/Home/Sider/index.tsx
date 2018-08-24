import * as React from 'react'
import classnames from 'classnames'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import { Layout, Menu, Icon, Switch } from 'antd'
import { checkPermissions } from 'react-authorized/lib'

import menu from './../menu'

import * as styles from './index.scss'

interface IStoreProps {
    sideBarCollapsed?: boolean
    sideBarTheme?: IGlobalStore.SideBarTheme
    changeSiderTheme?: (theme: IGlobalStore.SideBarTheme) => void
    userInfo?: IUserStore.UserInfo
    routerStore?: RouterStore
}

@inject(
    (store: IStore): IStoreProps => {
        const { routerStore, globalStore, userStore } = store
        const { userInfo } = userStore
        const { sideBarCollapsed, sideBarTheme, changeSiderTheme } = globalStore
        return {
            routerStore,
            sideBarCollapsed,
            sideBarTheme,
            changeSiderTheme,
            userInfo
        }
    }
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

    handleThemeChange = (e: boolean) => {
        this.props.changeSiderTheme(e ? 'dark' : 'light')
    }

    render() {
        const { userInfo, sideBarCollapsed, sideBarTheme } = this.props
        const ChangeTheme = (
            <div className={classnames(styles.changeTheme, sideBarTheme === 'dark' && styles.dark)}>
                Switch Theme
                <Switch checkedChildren="dark" unCheckedChildren="light" onChange={this.handleThemeChange} />
            </div>
        )
        return (
            <Layout.Sider
                className={styles.sider}
                trigger={null}
                theme={sideBarTheme}
                collapsible
                collapsed={sideBarCollapsed}
            >
                <div className={classnames(styles.logoBox, sideBarTheme === 'dark' && styles.dark)}>
                    <Icon type="ant-design" />
                </div>
                <Menu
                    className={styles.menu}
                    theme={sideBarTheme}
                    mode="inline"
                    defaultSelectedKeys={this.menuKeys.slice()}
                    onClick={this.goto}
                >
                    {menu.map(m => {
                        if (!checkPermissions(userInfo.category, m.permissions)) {
                            return null
                        }
                        return (
                            <Menu.Item key={m.path}>
                                <Icon type={m.icon} />
                                <span>{m.title}</span>
                            </Menu.Item>
                        )
                    })}
                </Menu>
                {!sideBarCollapsed && ChangeTheme}
            </Layout.Sider>
        )
    }
}

export default Sider
