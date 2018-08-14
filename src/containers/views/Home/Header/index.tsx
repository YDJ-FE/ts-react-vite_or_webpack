import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Layout, Icon, Button } from 'antd'

import * as styles from './index.scss'

interface IP {
    globalStore?: IGlobalStore.GlobalStore
    logout?: () => void
}

function Header({ globalStore, logout }: IP) {
    return (
        <Layout.Header className={styles.header}>
            <Icon
                className={styles.trigger}
                type={globalStore.sideBarCollapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={globalStore.toggleSideBarCollapsed}
            />
            <Button onClick={logout}>
                登出
            </Button>
        </Layout.Header>
    )
}

export default inject('globalStore')(observer(Header))
