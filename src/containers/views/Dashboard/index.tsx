import * as React from 'react'

import * as styles from './style.scss'
import ChartAreaStack from '@shared/ChartAreaStack'

function Dashboard() {
    return (
        <div className={styles.dashboard}>
            <ChartAreaStack style={{ height: 600, margin: '20px 0' }} />
        </div>
    )
}

export default Dashboard
