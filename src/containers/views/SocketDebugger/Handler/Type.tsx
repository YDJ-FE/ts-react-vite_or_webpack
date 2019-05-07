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

@inject(
    (store: IStore): IStoreProps => {
        const { socketIsConnected, socketType, setSocketType } = store.socketStore
        return { socketIsConnected, socketType, setSocketType }
    }
)
@observer
class Type extends React.Component<IStoreProps> {
    handleTypeChange = (e: RadioChangeEvent) => {
        const { value } = e.target
        this.props.setSocketType(value)
        localStorage.setItem(LOCALSTORAGE_KEYS.SOCKET_TYPE, value)
    }

    render() {
        const { socketType, socketIsConnected } = this.props
        return (
            <Radio.Group onChange={this.handleTypeChange} value={socketType} disabled={socketIsConnected}>
                {SOCKER_TYPES.map(s => (
                    <Radio.Button value={s} key={s}>
                        {s}
                    </Radio.Button>
                ))}
            </Radio.Group>
        )
    }
}

export default Type
