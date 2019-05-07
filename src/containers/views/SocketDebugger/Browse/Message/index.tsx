import * as React from 'react'
import { observer } from 'mobx-react'
import { computed } from 'mobx'
import moment from 'moment'
import { Tag } from 'antd'

import * as styles from './index.scss'

interface IProps {
    message: ISocketStore.Message
    style: React.CSSProperties
}

@observer
class Message extends React.Component<IProps> {
    @computed
    get time() {
        return moment(this.props.message.time).format('h:mm:ss a')
    }

    @computed
    get color() {
        const { from } = this.props.message
        if (from === 'browser') {
            return '#87d068'
        } else if (from === 'server') {
            return '#2db7f5'
        }
        return '#108ee9'
    }

    @computed
    get fromText() {
        const { from } = this.props.message
        if (from === 'browser') {
            return '你'
        } else if (from === 'server') {
            return '服务器'
        }
        return 'Console'
    }

    @computed
    get content() {
        const { data } = this.props.message
        if (!data) {
            return null
        }
        return typeof data === 'object' ? JSON.stringify(data) : data
    }

    render() {
        const { message, style } = this.props
        return (
            <div className={styles.message} style={style}>
                <div className={styles.messageHeader}>
                    {message.event && <Tag color="#f50">{message.event}</Tag>}
                    <Tag color={this.color}>{this.fromText}</Tag>
                    <span>{this.time}</span>
                </div>
                <div className={styles.content}>{this.content}</div>
            </div>
        )
    }
}

export default Message
