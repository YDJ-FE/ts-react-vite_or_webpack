import React from 'react'

import styles from './index.module.scss'

const Error = () => (
    <div className={styles.centered}>
        <div className={styles.emoji}>😭</div>
        <p className={styles.title}>Ooooops!</p>
        <p>This page does not exist anymore.</p>
    </div>
)

export default Error
