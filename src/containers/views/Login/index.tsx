import * as React from 'react'
import { inject, observer } from 'mobx-react'
import {observable, action} from 'mobx'
import { Button, Input, Radio } from 'antd'

import * as styles from './index.scss'

const RadioGroup = Radio.Group

interface Props {
    userStore?: IUserStore.UserStore
    routerStore?: RouterStore
}

class Login extends React.Component<Props> {
    // 账号密码
    @observable account: string = ''
    @observable password: string = ''
    // 用户组
    @observable category: string = 'user'

    @action
    inputAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.account = e.target.value
    }

    @action
    inputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.account = e.target.value
    }

    @action
    selectCategory = (e: React.ChangeEvent<any>) => {
        this.category = e.target.value
    }

    login = () => {
        const {account, password, category} = this
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
                    <div>
                        账号
                        <Input onChange={this.inputAccount}/>
                        密码
                        <Input onChange={this.inputPassword}/>
                    </div>
                    <RadioGroup value={this.category} onChange={this.selectCategory}>
                        <Radio value="user">user</Radio>
                        <Radio value="admin">admin</Radio>
                    </RadioGroup>
                    <Button type="primary" onClick={this.login}>
                        登录
                    </Button>
                </div>
            </div>
        )
    }
}

// function Login(props: Props) {
//     const { userStore, routerStore } = props
//     const gotoHome = () => {
//         routerStore.push('/')
//     }
//     return (
//         <div className={styles.login}>
//             Login!!!
//             <div className={styles.btnGroup}>
//                 {/* <Button type="primary" onClick={gotoHome}>
//                     go to page index directly
//                 </Button> */}
//                 <div>
//                     账号
//                     <Input />
//                     密码
//                     <Input />
//                 </div>
//                 <Button type="primary" onClick={userStore.login}>
//                     登录
//                 </Button>
//                 {/* <Button type="danger" onClick={userStore.getError}>
//                     must be error
//                 </Button> */}
//             </div>
//         </div>
//     )
// }

export default inject('userStore', 'routerStore')(observer(Login))
