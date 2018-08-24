import * as React from 'react'

import * as styles from './style.scss'
import ChartAreaStack from '@shared/ChartAreaStack'
import ChartPie from '@shared/ChartPie'
import ChartScatter from '@shared/ChartScatter'

function Dashboard() {
    return (
        <div className={styles.dashboard}>
            <ChartAreaStack />
            <ChartPie />
            <ChartScatter />
        </div>
    )
}

export default Dashboard
