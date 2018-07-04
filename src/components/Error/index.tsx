import * as React from 'react'

import * as styles from './index.scss'

const Error = () => (
    <div className={styles.centered}>
        <div className={styles.emoji}>😭</div>
        <p className={styles.title}>Ooooops!</p>
        <p>This page doesn't exist anymore.</p>
    </div>
)

export default Error
