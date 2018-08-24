import * as React from 'react'

import * as styles from './style.scss'
import ChartAreaStack from '@shared/ChartAreaStack'
import UserTable from '@shared/UserTable'

function Dashboard() {
    return (
        <div className={styles.dashboard}>
            <ChartAreaStack style={{ height: 600, margin: '20px 0' }} />
            <UserTable />
        </div>
    )
}

export default Dashboard
