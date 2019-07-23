import React from 'react'
import { Spin } from 'antd'

import styles from './index.scss'

function PageLoading() {
    return (
        <div className={styles.pageLoading}>
            <Spin className={styles.spin} />
        </div>
    )
}

export default PageLoading
