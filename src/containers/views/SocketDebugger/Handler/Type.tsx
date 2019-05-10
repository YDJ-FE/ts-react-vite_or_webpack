import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'

import { LOCALSTORAGE_KEYS } from '@constants/index'
import { SOCKER_TYPES } from '@constants/socket'

interface IStoreProps {
    socketType?: ISocketStore.SocketType
    socketIsConnected?: boolean
    setSocketType?: (type: ISocketStore.SocketType) => void
}

function Type({ socketType, socketIsConnected, setSocketType }: IStoreProps) {
    function handleTypeChange(e: RadioChangeEvent) {
        const { value } = e.target
        setSocketType(value)
        localStorage.setItem(LOCALSTORAGE_KEYS.SOCKET_TYPE, value)
    }
    return (
        <Radio.Group onChange={handleTypeChange} value={socketType} disabled={socketIsConnected}>
            {SOCKER_TYPES.map(s => (
                <Radio.Button value={s} key={s}>
                    {s}
                </Radio.Button>
            ))}
        </Radio.Group>
    )
}

export default inject(
    (store: IStore): IStoreProps => {
        const { socketIsConnected, socketType, setSocketType } = store.socketStore
        return { socketIsConnected, socketType, setSocketType }
    }
)(observer(Type))
