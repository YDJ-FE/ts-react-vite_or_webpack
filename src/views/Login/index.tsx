import * as React from 'react'

import * as styles from './index.css'

const Login = () => (
    <div className={styles.test}>
        {process.env.APP_ENV}
        ... Login !!!...
    </div>
)

export default Login
