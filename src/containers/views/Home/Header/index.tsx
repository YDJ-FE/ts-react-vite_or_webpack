import React from 'react'
import { observer } from 'mobx-react'
import { Layout, Icon } from 'antd'

import styles from './index.scss'
import useRootStore from '@store/useRootStore'
import { GITHUB_LINK } from '@constants/index'

function Header() {
    const { globalStore, authStore } = useRootStore()
    return (
        <Layout.Header className={styles.header}>
            <Icon
                className={styles.trigger}
                type={globalStore.sideBarCollapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={globalStore.toggleSideBarCollapsed}
            />
            <div className={styles.right}>
                <Icon
                    className={styles.rightIcon}
                    type="github"
                    theme="outlined"
                    onClick={() => window.open(GITHUB_LINK)}
                />
                <Icon className={styles.rightIcon} type="logout" theme="outlined" onClick={authStore.logout} />
            </div>
        </Layout.Header>
    )
}

export default observer(Header)
