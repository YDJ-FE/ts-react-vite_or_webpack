import * as React from 'react'
import { reaction } from 'mobx'
import { inject, observer } from 'mobx-react'
import { AutoSizer } from 'react-virtualized/dist/es/AutoSizer'
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized/dist/es/CellMeasurer'
import { List as VList } from 'react-virtualized/dist/es/List'

import * as styles from './index.scss'
import { useOnMount } from '@utils/reactExt'
import Message from './Message'

interface IStoreProps {
    messages?: ISocketStore.Message[]
}

function Browse({ messages }: IStoreProps) {
    const vList = React.useRef<VList>(null)
    const measureCache = new CellMeasurerCache({
        fixedWidth: true,
        minHeight: 43
    })

    async function sleep(ms = 10): Promise<any> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, ms)
        })
    }

    function handleMessagesChanged(len: number) {
        if (len === 0) {
            return measureCache.clearAll()
        }
        async function scrollToRow(rowIndex?: number) {
            if (rowIndex === undefined) {
                rowIndex = len - 1
            }
            const arr = new Array(3).fill(0)
            for (let i = 0; i < arr.length; i++) {
                if (i !== 0) {
                    await sleep()
                }
                if (!vList.current) {
                    break
                }
                vList.current.scrollToRow(rowIndex)
            }
        }
        scrollToRow()
    }

    function listenMessagesLen() {
        return reaction(() => messages.length, handleMessagesChanged)
    }

    useOnMount(listenMessagesLen)

    function renderItem({ index, key, parent, style }) {
        const item = messages[index]
        return (
            <CellMeasurer cache={measureCache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
                <Message style={style} message={item} />
            </CellMeasurer>
        )
    }
    const rowCount = messages.length
    return (
        <div className={styles.browse}>
            <AutoSizer>
                {({ width, height }) => (
                    <VList
                        width={width}
                        height={height}
                        ref={vList}
                        overscanRowCount={0}
                        rowCount={rowCount}
                        deferredMeasurementCache={measureCache}
                        rowHeight={measureCache.rowHeight}
                        rowRenderer={renderItem}
                    />
                )}
            </AutoSizer>
        </div>
    )
}

export default inject((store: IStore): IStoreProps => ({ messages: store.socketStore.messages }))(observer(Browse))
