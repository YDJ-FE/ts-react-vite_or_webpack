import React from 'react'
import { observer } from 'mobx-react'
import { Button, AutoComplete, Popconfirm, Modal, Input, message } from 'antd'
import ReactJson from 'react-json-view'

import styles from './index.module.scss'
import useRootStore from '@store/useRootStore'
import { LOCALSTORAGE_KEYS } from '@constants/index'
import { DATA_FORMATS } from '@constants/socket'
import { send } from '@services/websocket'

const localSocketIOEvents = localStorage.getItem(LOCALSTORAGE_KEYS.SOCKET_IO_EVENTS)
let initialSocketIOEvents: { value: string }[] = localSocketIOEvents ? JSON.parse(localSocketIOEvents) : []
if (initialSocketIOEvents.length > 30) {
    initialSocketIOEvents = initialSocketIOEvents.slice(0, 30)
}

function Send() {
    const { socketStore } = useRootStore()

    const [content, setContent] = React.useState('')
    const [textContent, setTextContent] = React.useState('')
    const [jsonContent, setJsonContent] = React.useState<PlainObject>({})
    const [socketIOEvent, setSocketIOEvent] = React.useState('')
    const [socketIOEvents, setSocketIOEvents] = React.useState(initialSocketIOEvents)
    const [modalVisible, setModalVisible] = React.useState(false)

    const canSend = React.useMemo(() => {
        if (socketStore.isSocketIO && !socketIOEvent) {
            return false
        }
        return socketStore.socketIsConnected
    }, [socketStore.isSocketIO, socketIOEvent, socketStore.socketIsConnected])

    const sendingContent = React.useMemo(
        () => (socketStore.dataFormat === DATA_FORMATS[0] ? jsonContent : textContent),
        [socketStore.dataFormat, jsonContent, textContent]
    )

    function toggleModalVisible() {
        setModalVisible(visible => !visible)
    }

    function handleOK() {
        try {
            setJsonContent(JSON.parse(content))
            toggleModalVisible()
        } catch (err) {
            console.error(err)
            message.destroy()
            message.error('Please input json string!')
        }
    }

    function handleSubmit() {
        if (!socketStore.isSocketIO) {
            return send(null, sendingContent)
        } else if (!socketIOEvent) {
            message.destroy()
            return message.error('Please input event name!')
        }
        const hasStoraged = socketIOEvents.some(e => e.value === socketIOEvent)
        if (!hasStoraged) {
            const newSocketIOEvents = [{ value: socketIOEvent }, ...socketIOEvents]
            setSocketIOEvents(newSocketIOEvents)
            localStorage.setItem(LOCALSTORAGE_KEYS.SOCKET_IO_EVENTS, JSON.stringify(newSocketIOEvents))
        }
        send(socketIOEvent, sendingContent)
    }

    return (
        <div>
            {socketStore.isSocketIO && (
                <AutoComplete
                    className={styles.autoComplete}
                    options={socketIOEvents}
                    placeholder="Input event name"
                    value={socketIOEvent}
                    onChange={e => setSocketIOEvent(e as string)}
                    filterOption={(inputValue, option) => option.value.toUpperCase().includes(inputValue.toUpperCase())}
                />
            )}
            {socketStore.dataFormat === DATA_FORMATS[0] ? (
                <div className={styles.content}>
                    <div className={styles.reset}>
                        <Popconfirm placement="topLeft" title="Confirm to reset?" onConfirm={() => setJsonContent({})}>
                            <Button>Reset</Button>
                        </Popconfirm>
                        <Button className={styles.btnCover} type="primary" onClick={toggleModalVisible}>
                            Custom
                        </Button>
                        <Modal
                            title="Custom data"
                            style={{ top: 20 }}
                            visible={modalVisible}
                            onOk={handleOK}
                            onCancel={toggleModalVisible}
                        >
                            <Input.TextArea
                                placeholder="Please input json string"
                                autoSize={{ minRows: 4, maxRows: 10 }}
                                value={content}
                                onChange={({ target }) => setContent(target.value)}
                            />
                        </Modal>
                    </div>
                    <ReactJson
                        name={false}
                        theme="monokai"
                        style={{
                            padding: 10,
                            minHeight: 150,
                            maxHeight: 500,
                            overflow: 'auto',
                            borderRadius: 3,
                            wordWrap: 'break-word',
                            wordBreak: 'break-all'
                        }}
                        onAdd={({ updated_src: uSrc }) => setJsonContent(uSrc as PlainObject)}
                        onEdit={({ updated_src: uSrc }) => setJsonContent(uSrc as PlainObject)}
                        onDelete={({ updated_src: uSrc }) => setJsonContent(uSrc as PlainObject)}
                        src={jsonContent}
                    />
                </div>
            ) : (
                <Input.TextArea
                    className={styles.textContent}
                    placeholder="Input your sending content"
                    autoSize={{ minRows: 4, maxRows: 10 }}
                    value={textContent}
                    onChange={({ target }) => setTextContent(target.value)}
                />
            )}
            <Button block size="large" disabled={!canSend} type="primary" onClick={handleSubmit}>
                Send
            </Button>
        </div>
    )
}

export default observer(Send)
