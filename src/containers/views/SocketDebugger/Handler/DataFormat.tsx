import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { Select } from 'antd'

import { LOCALSTORAGE_KEYS } from '@constants/index'
import { DATA_FORMATS } from '@constants/socket'

interface IStoreProps {
    dataFormat?: string
    setDataFormat?: (dataFormat: string) => void
}

function DataFormat({ dataFormat, setDataFormat }: IStoreProps) {
    const handleChange = (val: string) => {
        setDataFormat(val)
        localStorage.setItem(LOCALSTORAGE_KEYS.DATA_FORMAT, val)
    }
    return (
        <Select value={dataFormat} style={{ width: 120 }} onChange={handleChange}>
            {DATA_FORMATS.map(d => (
                <Select.Option key={d} value={d}>
                    {d}
                </Select.Option>
            ))}
        </Select>
    )
}

export default inject(
    (store: IStore): IStoreProps => {
        const { dataFormat, setDataFormat } = store.socketStore
        return { dataFormat, setDataFormat }
    }
)(observer(DataFormat))
