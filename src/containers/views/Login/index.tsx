import * as React from 'react'
import { inject, observer } from 'mobx-react'
import {observable, action} from 'mobx'
import { Button } from 'antd'

import * as styles from './index.scss'

interface Props {
    userStore?: IUserStore.UserStore
    routerStore?: RouterStore
}

class Login extends React.Component<Props> {
    // 账号密码
    @observable account: string = ''
    @observable password: string = ''

    @action
    inputAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.account = e.target.value
    }

    @action
    inputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.account = e.target.value
    }

    login = (category: string) => {
        const {account, password} = this
        this.props.userStore.login({
            account,
            password,
            category
        })
    }

    render() {
        return (
            <div className={styles.login}>
                Login!!!
                <div className={styles.btnGroup}>
                    <Button type="primary" onClick={() => this.login('user')}>
                        用户登录
                    </Button>
                    <Button type="primary" onClick={() => this.login('admin')}>
                        管理员登录
                    </Button>
                </div>
            </div>
        )
    }
}

export default inject('userStore', 'routerStore')(observer(Login))
