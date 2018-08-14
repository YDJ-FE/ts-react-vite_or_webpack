import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd'

import * as styles from './index.scss'

interface IStoreProps {
    routerStore?: RouterStore
    login?: (data: any) => Promise<any>
    getError?: () => Promise<any>
}

class Login extends React.Component<IStoreProps> {

    login = (category: string) => {
        this.props.login({
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
