import * as React from 'react'

import * as styles from './style.scss'
import IconReact from '@assets/svg/react.svg'

function Dashboard() {
    return (
        <div className={styles.dashboard}>
            <IconReact width={180} height={180} color="purple" />
        </div>
    )
}

export default Dashboard
