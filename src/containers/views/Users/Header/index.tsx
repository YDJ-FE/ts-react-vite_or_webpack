import * as React from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { Button } from 'antd'

import * as styles from './index.scss'
import UserModal from './../UserModal'

@observer
class Header extends React.Component {
    @observable
    private userModalVisible: boolean = false

    @action
    toggleUserModalVisible = () => {
        this.userModalVisible = !this.userModalVisible
    }

    render() {
        return (
            <div className={styles.header}>
                <Button type="primary" onClick={this.toggleUserModalVisible}>
                    add user
                </Button>
                <UserModal visible={this.userModalVisible} onCancel={this.toggleUserModalVisible} />
            </div>
        )
    }
}

export default Header
