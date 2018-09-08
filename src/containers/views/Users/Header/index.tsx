import * as React from 'react'
import { Button } from 'antd'

import * as styles from './index.scss'

function Header() {
    return (
        <div className={styles.header}>
            <Button type="primary">add user</Button>
        </div>
    )
}

export default Header
