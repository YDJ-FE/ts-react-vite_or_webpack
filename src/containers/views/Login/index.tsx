import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd'

import * as styles from './index.scss'

interface Props {
    userStore?: IUserStore.UserStore
    routerStore?: RouterStore
}

function Login(props: Props) {
    const { userStore, routerStore } = props
    const gotoHome = () => {
        routerStore.push('/')
    }
    return (
        <div className={styles.login}>
            Login!!!
            <div>
                <Button type="primary" onClick={gotoHome}>
                    直接跳转到首页
                </Button>
                <Button type="primary" onClick={userStore.login}>
                    成功!
                </Button>
                <Button type="danger" onClick={userStore.getError}>
                    失败
                </Button>
            </div>
        </div>
    )
}

export default inject('userStore', 'routerStore')(observer(Login))
