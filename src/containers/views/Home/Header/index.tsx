import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Layout, Icon } from 'antd'

import * as styles from './index.scss'

interface IStoreProps {
    sideBarCollapsed?: boolean
    toggleSideBarCollapsed?: () => void
}

function Header({ sideBarCollapsed, toggleSideBarCollapsed }: IStoreProps) {
    return (
        <Layout.Header className={styles.header}>
            <Icon
                className={styles.trigger}
                type={sideBarCollapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={toggleSideBarCollapsed}
            />
        </Layout.Header>
    )
}

export default inject(
    (store: IStore): IStoreProps => {
        const { sideBarCollapsed, toggleSideBarCollapsed } = store.globalStore
        return { sideBarCollapsed, toggleSideBarCollapsed }
    }
)(observer(Header))
