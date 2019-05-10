import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { Button } from 'antd'

import * as styles from './index.scss'
import UserModal from './../UserModal'

function Header() {
    const [modalVisible, setModalVisible] = React.useState(false)

    function toggleModalVisible() {
        setModalVisible(visible => !visible)
    }

    return (
        <div className={styles.header}>
            <Button type="primary" onClick={toggleModalVisible}>
                add user
            </Button>
            <UserModal visible={modalVisible} onCancel={toggleModalVisible} />
        </div>
    )
}

export default observer(Header)
