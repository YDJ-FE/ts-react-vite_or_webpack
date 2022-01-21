import React from 'react'
import classnames from 'classnames'
import { observer } from 'mobx-react'
import { Layout, Switch } from 'antd'
import { AntDesignOutlined } from '@ant-design/icons'

import styles from './index.module.scss'
import useRootStore from '@store/useRootStore'
import SiderMenu from './Menu'

function Sider() {
    const { sideBarCollapsed, sideBarTheme, changeSiderTheme } = useRootStore().globalStore

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
                <AntDesignOutlined />
            </div>
            <SiderMenu />
            {!sideBarCollapsed && ChangeTheme}
        </Layout.Sider>
    )
}

export default observer(Sider)
