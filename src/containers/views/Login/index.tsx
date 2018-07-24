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
            <div className={styles.btnGroup}>
                <Button type="primary" onClick={gotoHome}>
                    go to page index directly
                </Button>
                <Button type="primary" onClick={userStore.login}>
                    go to page index when request successfully
                </Button>
                <Button type="danger" onClick={userStore.getError}>
                    must be error
                </Button>
            </div>
        </div>
    )
}

export default inject('userStore', 'routerStore')(observer(Login))
