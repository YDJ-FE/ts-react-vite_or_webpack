import React from 'react'
import { reaction } from 'mobx'
import { observer } from 'mobx-react'
import { AutoSizer } from 'react-virtualized/dist/es/AutoSizer'
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized/dist/es/CellMeasurer'
import { List as VList, ListRowProps } from 'react-virtualized/dist/es/List'

import styles from './index.module.scss'
import useRootStore from '@store/useRootStore'
import { useOnMount } from '@utils/hooks'
import Message from './Message'

function Browse() {
    const { socketStore } = useRootStore()

    const vList = React.useRef<VList>(null)
    const measureCache = new CellMeasurerCache({
        fixedWidth: true,
        minHeight: 43
    })

    function handleMessagesChanged(len: number) {
        if (len === 0) {
            return measureCache.clearAll()
        }
        if (vList.current) {
            vList.current.scrollToRow(len - 1)
        }
    }

    function listenMessagesLen() {
        return reaction(() => socketStore.messages.length, handleMessagesChanged)
    }

    useOnMount(listenMessagesLen)

    function renderItem({ index, key, parent, style }: ListRowProps) {
        const item = socketStore.messages[index]
        return (
            <CellMeasurer cache={measureCache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
                <Message style={style} message={item} />
            </CellMeasurer>
        )
    }
    const rowCount = socketStore.messages.length
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

export default observer(Browse)
