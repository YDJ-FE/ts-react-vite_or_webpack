import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Layout, Icon } from 'antd'

import * as styles from './index.scss'

interface IP {
    globalStore?: IGlobalStore.GlobalStore
}

function Header({ globalStore }: IP) {
    return (
        <Layout.Header className={styles.header}>
            <Icon
                className={styles.trigger}
                type={globalStore.sideBarCollapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={globalStore.toggleSideBarCollapsed}
            />
        </Layout.Header>
    )
}

export default inject('globalStore')(observer(Header))
