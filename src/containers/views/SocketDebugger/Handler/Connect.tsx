import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { useComputed } from 'mobx-react-lite'
import { message, Input, Button, Checkbox } from 'antd'

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

function Connect({
    setNotSupportPolling,
    notSupportPolling,
    isSocketIO,
    socketIsConnected,
    clearMessages
}: IStoreProps) {
    const [url, setUrl] = React.useState(localStorage.getItem(LOCALSTORAGE_KEYS.SOCKET_URL))
    const urlExample = useComputed(() => (isSocketIO ? 'wss://showcase.jackple.com' : 'ws://127.0.0.1:3001'), [
        isSocketIO
    ])

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setUrl(value)
        localStorage.setItem(LOCALSTORAGE_KEYS.SOCKET_URL, value)
    }

    function handleConnect() {
        if (!url) {
            message.destroy()
            return message.error('Please input socket url!')
        }
        socketConnect(url)
        clearMessages()
    }

    return (
        <div className={styles.container}>
            <div className={styles.connect}>
                <Input className={styles.socketUrlInput} value={url} onChange={handleChange} />
                {isSocketIO && (
                    <Checkbox
                        disabled={socketIsConnected}
                        className={styles.checkbox}
                        checked={notSupportPolling}
                        onChange={e => setNotSupportPolling(e.target.checked)}
                    >
                        no polling
                    </Checkbox>
                )}
                <Button className={styles.btn} type="primary" onClick={handleConnect} disabled={socketIsConnected}>
                    connect
                </Button>
                <Button className={styles.btn} type="danger" onClick={socketDisconnect} disabled={!socketIsConnected}>
                    disconnect
                </Button>
            </div>
            <blockquote className={styles.tips}>protocol//ip or domain:host (example: {urlExample})</blockquote>
        </div>
    )
}

export default inject(
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
)(observer(Connect))
