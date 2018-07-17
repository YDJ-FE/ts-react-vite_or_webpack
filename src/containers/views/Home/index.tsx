import * as React from 'react'

import * as styles from './index.scss'
import IconReact from '@assets/svg/react.svg'

const Home = () => (
    <div className={styles.home}>
        <IconReact width={180} height={180} color="purple" />
        <div className={styles.home}>home</div>
    </div>
)

export default Home
