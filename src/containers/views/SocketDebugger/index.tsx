import React from 'react'

import styles from './index.module.scss'
import Handler from './Handler'
import Browse from './Browse'

function SocketDebugger() {
    return (
        <div className={styles.container}>
            <Handler />
            <Browse />
        </div>
    )
}

export default SocketDebugger
