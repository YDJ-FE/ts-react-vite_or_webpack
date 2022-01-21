import React from 'react'

import styles from './index.module.scss'
import Type from './Type'
import DataFormat from './DataFormat'
import Connect from './Connect'
import Send from './Send'

function Handler() {
    return (
        <div className={styles.handler}>
            <div className={styles.head}>
                <Type />
                <DataFormat />
            </div>
            <Connect />
            <Send />
        </div>
    )
}

export default Handler
