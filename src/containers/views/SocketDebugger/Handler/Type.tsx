import React from 'react'
import { observer } from 'mobx-react'
import { Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'

import useRootStore from '@store/useRootStore'
import { LOCALSTORAGE_KEYS } from '@constants/index'
import { SOCKER_TYPES } from '@constants/socket'

function Type() {
    const { socketStore } = useRootStore()

    function handleTypeChange(e: RadioChangeEvent) {
        const { value } = e.target
        socketStore.setSocketType(value)
        localStorage.setItem(LOCALSTORAGE_KEYS.SOCKET_TYPE, value)
    }
    return (
        <Radio.Group
            onChange={handleTypeChange}
            value={socketStore.socketType}
            disabled={socketStore.socketIsConnected}
        >
            {SOCKER_TYPES.map(s => (
                <Radio.Button value={s} key={s}>
                    {s}
                </Radio.Button>
            ))}
        </Radio.Group>
    )
}

export default observer(Type)
