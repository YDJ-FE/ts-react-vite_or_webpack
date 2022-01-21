import React from 'react'
import { observer } from 'mobx-react'
import { Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, GithubOutlined, LogoutOutlined } from '@ant-design/icons'

import styles from './index.module.scss'
import useRootStore from '@store/useRootStore'
import { GITHUB_LINK } from '@constants/index'

function Header() {
    const { globalStore, authStore } = useRootStore()
    const IconMenuFold = globalStore.sideBarCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined
    return (
        <Layout.Header className={styles.header}>
            <IconMenuFold className={styles.trigger} onClick={globalStore.toggleSideBarCollapsed} />
            <div className={styles.right}>
                <GithubOutlined className={styles.rightIcon} onClick={() => window.open(GITHUB_LINK)} />
                <LogoutOutlined className={styles.rightIcon} onClick={authStore.logout} />
            </div>
        </Layout.Header>
    )
}

export default observer(Header)
