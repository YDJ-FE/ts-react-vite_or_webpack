import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { reaction } from 'mobx'
import { AutoSizer } from 'react-virtualized/dist/es/AutoSizer'
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized/dist/es/CellMeasurer'
import { List as VList } from 'react-virtualized/dist/es/List'

import * as styles from './index.scss'
import Message from './Message'

interface IStoreProps {
    messages?: ISocketStore.Message[]
}

@inject((store: IStore): IStoreProps => ({ messages: store.socketStore.messages }))
@observer
class Browse extends React.Component<IStoreProps> {
    // list ref
    private vList: VList = null

    private measureCache = new CellMeasurerCache({
        fixedWidth: true,
        minHeight: 48
    })

    private messagesDisposer = reaction(
        () => this.props.messages.length,
        messagesLength => {
            if (messagesLength === 0) {
                return this.measureCache.clearAll()
            }
            this.scrollToRow()
        }
    )

    setVListRef = (ref: VList): void => {
        this.vList = ref
    }

    sleep = async (ms = 10): Promise<any> => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, ms)
        })
    }

    scrollToRow = async (rowIndex?: number): Promise<any> => {
        if (rowIndex === undefined) {
            const { messages } = this.props
            rowIndex = messages.length - 1
        }
        const arr = new Array(3).fill(0)
        for (let i = 0; i < arr.length; i++) {
            if (i !== 0) {
                await this.sleep()
            }
            if (!this.vList) {
                break
            }
            this.vList.scrollToRow(rowIndex)
        }
    }

    componentWillUnmount() {
        this.messagesDisposer()
    }

    render() {
        const { messages } = this.props
        const renderItem = ({ index, key, parent, style }) => {
            const messagesC = messages.slice()
            const item = messagesC[index]
            return (
                <CellMeasurer cache={this.measureCache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
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
                            ref={this.setVListRef}
                            overscanRowCount={6}
                            rowCount={rowCount}
                            deferredMeasurementCache={this.measureCache}
                            rowHeight={this.measureCache.rowHeight}
                            rowRenderer={renderItem}
                        />
                    )}
                </AutoSizer>
            </div>
        )
    }
}

export default Browse
