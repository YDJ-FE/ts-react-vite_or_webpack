import * as React from 'react'

import * as styles from './index.scss'
import IconReact from '@assets/svg/react.svg'

function TestComponentOne() {
    return (
        <div className={styles.testComponentOne}>
            <IconReact width={180} height={180} color="purple" />
        </div>
    )
}

export default TestComponentOne
