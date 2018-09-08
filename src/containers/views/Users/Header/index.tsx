import * as React from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { Button } from 'antd'

import * as styles from './index.scss'
import AddUserModal from './AddUserModal'

@observer
class Header extends React.Component {
    @observable
    private addUserModalVisible: boolean = false

    @action
    toggleAddUserModalVisible = () => {
        this.addUserModalVisible = !this.addUserModalVisible
    }

    render() {
        return (
            <div className={styles.header}>
                <Button type="primary" onClick={this.toggleAddUserModalVisible}>
                    add user
                </Button>
                <AddUserModal visible={this.addUserModalVisible} onCancel={this.toggleAddUserModalVisible} />
            </div>
        )
    }
}

export default Header
