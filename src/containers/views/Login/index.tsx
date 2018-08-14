import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd'

import * as styles from './index.scss'

interface IStoreProps {
    routerStore?: RouterStore
    login?: () => Promise<any>
    getError?: () => Promise<any>
}

function Login(props: IStoreProps) {
    const { login, getError, routerStore } = props
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
                <Button type="primary" onClick={login}>
                    go to page index when request successfully
                </Button>
                <Button type="danger" onClick={getError}>
                    must be error
                </Button>
            </div>
        </div>
    )
}

export default inject(
    (store: IStore): IStoreProps => {
        const { routerStore, userStore } = store
        const { login, getError } = userStore
        return {
            routerStore,
            login,
            getError
        }
    }
)(observer(Login))
