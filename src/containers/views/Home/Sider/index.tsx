import * as React from 'react'
import classnames from 'classnames'
import { observer, inject } from 'mobx-react'
import { Layout, Icon, Switch } from 'antd'

import * as styles from './index.scss'
import SiderMenu from './Menu'

interface IStoreProps {
    sideBarCollapsed?: boolean
    sideBarTheme?: IGlobalStore.SideBarTheme
    changeSiderTheme?: (theme: IGlobalStore.SideBarTheme) => void
}

function Sider({ sideBarCollapsed, sideBarTheme, changeSiderTheme }: IStoreProps) {
    const ChangeTheme = (
        <div className={classnames(styles.changeTheme, sideBarTheme === 'dark' && styles.dark)}>
            Switch Theme
            <Switch
                checkedChildren="dark"
                unCheckedChildren="light"
                checked={sideBarTheme === 'dark'}
                onChange={val => changeSiderTheme(val ? 'dark' : 'light')}
            />
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
            <SiderMenu />
            {!sideBarCollapsed && ChangeTheme}
        </Layout.Sider>
    )
}

export default inject(
    (store: IStore): IStoreProps => {
        const { globalStore } = store
        const { sideBarCollapsed, sideBarTheme, changeSiderTheme } = globalStore
        return {
            sideBarCollapsed,
            sideBarTheme,
            changeSiderTheme
        }
    }
)(observer(Sider))
