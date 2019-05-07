import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { action, observable, computed } from 'mobx'
import { message, Input, Button, Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

import * as styles from './index.scss'
import { socketConnect, socketDisconnect } from '@services/websocket'
import { LOCALSTORAGE_KEYS } from '@constants/index'

interface IStoreProps {
    setNotSupportPolling?: (val: boolean) => void
    notSupportPolling?: boolean
    isSocketIO?: boolean
    socketIsConnected?: boolean
    clearMessages?: () => void
}

@inject(
    (store: IStore): IStoreProps => {
        const {
            setNotSupportPolling,
            notSupportPolling,
            isSocketIO,
            socketIsConnected,
            clearMessages
        } = store.socketStore
        return {
            setNotSupportPolling,
            notSupportPolling,
            isSocketIO,
            socketIsConnected,
            clearMessages
        }
    }
)
@observer
class Connect extends React.Component<IStoreProps> {
    @observable
    private url: string = localStorage.getItem(LOCALSTORAGE_KEYS.SOCKET_URL)

    @computed
    get urlExample() {
        return this.props.isSocketIO ? 'wss://showcase.jackple.com' : 'ws://127.0.0.1:3001'
    }

    @action
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        this.url = value
        localStorage.setItem(LOCALSTORAGE_KEYS.SOCKET_URL, value)
    }

    handleConnect = () => {
        if (!this.url) {
            message.destroy()
            return message.error('请先输入socket链接!!!')
        }
        socketConnect(this.url)
        this.props.clearMessages()
    }

    handleDisconnect = () => {
        socketDisconnect()
    }

    handleCheckBoxChange = (e: CheckboxChangeEvent) => {
        const { setNotSupportPolling } = this.props
        setNotSupportPolling(e.target.checked)
    }

    render() {
        const { notSupportPolling, isSocketIO, socketIsConnected } = this.props
        return (
            <div className={styles.container}>
                <div className={styles.connect}>
                    <Input value={this.url} onChange={this.handleChange} />
                    {isSocketIO && (
                        <Checkbox
                            disabled={socketIsConnected}
                            className={styles.checkbox}
                            checked={notSupportPolling}
                            onChange={this.handleCheckBoxChange}
                        >
                            no polling
                        </Checkbox>
                    )}
                    <Button
                        className={styles.btn}
                        type="primary"
                        onClick={this.handleConnect}
                        disabled={socketIsConnected}
                    >
                        连接
                    </Button>
                    <Button
                        className={styles.btn}
                        type="danger"
                        onClick={this.handleDisconnect}
                        disabled={!socketIsConnected}
                    >
                        断开
                    </Button>
                </div>
                <blockquote className={styles.tips}>
                    连接格式为 protocol//ip或域名:端口 (示例 {this.urlExample})
                </blockquote>
            </div>
        )
    }
}

export default Connect
