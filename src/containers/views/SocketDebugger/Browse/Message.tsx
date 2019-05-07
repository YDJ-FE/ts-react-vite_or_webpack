import * as React from 'react'
import { observer, useComputed } from 'mobx-react-lite'
import moment from 'moment'
import { Tag } from 'antd'

import * as styles from './index.scss'

interface IProps {
    message: ISocketStore.Message
    style: React.CSSProperties
}

function Message({ message, style }: IProps) {
    const time = useComputed(() => moment(message.time).format('h:mm:ss a'), [message])
    const color = useComputed(() => {
        if (message.from === 'browser') {
            return '#87d068'
        } else if (message.from === 'server') {
            return '#2db7f5'
        }
        return '#108ee9'
    }, [message])
    const fromText = useComputed(() => {
        if (message.from === 'browser') {
            return 'You'
        } else if (message.from === 'server') {
            return 'Server'
        }
        return 'Console'
    }, [message])
    const content = useComputed(() => {
        if (!message.data) {
            return null
        }
        return typeof message.data === 'object' ? JSON.stringify(message.data) : message.data
    }, [message])

    return (
        <div className={styles.message} style={style}>
            <div className={styles.messageHeader} style={{ marginBottom: !!content ? 5 : 0 }}>
                {message.event && <Tag color="#f50">{message.event}</Tag>}
                <Tag color={color}>{fromText}</Tag>
                <span>{time}</span>
            </div>
            <div className={styles.content}>{content}</div>
        </div>
    )
}

export default observer(Message)
