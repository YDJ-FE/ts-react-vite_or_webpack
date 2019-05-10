import * as React from 'react'
import { inject } from 'mobx-react'
import { observer, useDisposable } from 'mobx-react-lite'
import { reaction } from 'mobx'
import { AutoSizer } from 'react-virtualized/dist/es/AutoSizer'
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized/dist/es/CellMeasurer'
import { List as VList } from 'react-virtualized/dist/es/List'

import * as styles from './index.scss'
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

    async function scrollToRow(rowIndex?: number): Promise<any> {
        if (rowIndex === undefined) {
            rowIndex = messages.length - 1
        }
        const arr = new Array(3).fill(0)
        for (let i = 0; i < arr.length; i++) {
            if (i !== 0) {
                await sleep()
            }
            if (!vList) {
                break
            }
            vList.current.scrollToRow(rowIndex)
        }
    }

    useDisposable(() =>
        reaction(
            () => messages.length,
            messagesLength => {
                if (messagesLength === 0) {
                    return measureCache.clearAll()
                }
                scrollToRow()
            }
        )
    )

    function renderItem({ index, key, parent, style }) {
        const item = messages.slice()[index]
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
