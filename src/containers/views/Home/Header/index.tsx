import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Layout, Icon, Button } from 'antd'

import * as styles from './index.scss'

interface IStoreProps {
    sideBarCollapsed?: boolean
    toggleSideBarCollapsed?: () => void
    logout?: () => void
}

function Header({ sideBarCollapsed, toggleSideBarCollapsed, logout }: IStoreProps) {
    return (
        <Layout.Header className={styles.header}>
            <Icon
                className={styles.trigger}
                type={sideBarCollapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={toggleSideBarCollapsed}
            />
            <Button onClick={logout}>logout</Button>
        </Layout.Header>
    )
}

export default inject(
    (store: IStore): IStoreProps => {
        const { sideBarCollapsed, toggleSideBarCollapsed } = store.globalStore
        return { sideBarCollapsed, toggleSideBarCollapsed }
    }
)(observer(Header))
