import React from 'react'
import { observer } from 'mobx-react'
import moment from 'moment'
import { Tag } from 'antd'

import styles from './index.module.scss'

interface IProps {
    message: ISocketStore.Message
    style: React.CSSProperties
}

function Message({ message, style }: IProps) {
    const time = moment(message.time).format('h:mm:ss a')
    const color = message.from === 'browser' ? '#87d068' : message.from === 'server' ? '#2db7f5' : '#108ee9'
    const fromText = message.from === 'browser' ? 'You' : message.from === 'server' ? 'Server' : 'Console'
    const content = typeof message.data === 'object' ? JSON.stringify(message.data) : message.data

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
