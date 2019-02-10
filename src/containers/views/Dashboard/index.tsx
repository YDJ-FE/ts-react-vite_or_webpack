import * as React from 'react'
import { Avatar, Button } from 'antd'

import * as styles from './style.scss'
import ChartAreaStack from '@shared/ChartAreaStack'

const AVATAR_URL = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'

function Dashboard() {
    const [avatars, setAvatars] = React.useState([AVATAR_URL])
    function addAvatar() {
        const newAvatars = [...avatars, `${AVATAR_URL}?t=${Date.now()}`]
        setAvatars(newAvatars)
    }
    React.useEffect(() => {
        const title = avatars.length > 1 ? `${avatars.length} avatars!` : 'oosh!'
        document.title = title
    })
    return (
        <div className={styles.dashboard}>
            <div className={styles.avatarsContainer}>
                <Button type="primary" onClick={addAvatar}>
                    add
                </Button>
                <div className={styles.avatars}>
                    {avatars.map(a => (
                        <Avatar style={{ marginLeft: 10 }} key={a} src={a} />
                    ))}
                </div>
            </div>
            <ChartAreaStack style={{ height: 600, margin: '20px 0' }} />
        </div>
    )
}

export default Dashboard
