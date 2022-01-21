import React from 'react'

import styles from './index.module.scss'
import Header from './Header'
import UserTable from './UserTable'
import AutoSizer from '@components/AutoSizer'

export default function Users() {
    return (
        <div className={styles.container}>
            <Header />
            <AutoSizer className={styles.tableBox}>{({ height }) => <UserTable scrollY={height - 120} />}</AutoSizer>
        </div>
    )
}
