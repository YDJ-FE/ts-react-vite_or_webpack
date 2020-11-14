import { EventEmitter } from 'eventemitter3'
import { message } from 'antd'
import { reaction } from 'mobx'

import { socketStore } from '@store/index'

let reopenTimer: number = null
// 是否主动断开
let disconnectInitiative = false

interface SocketMsg {
    data: any
}

/**
 * socket 通信
 *
 * @export
 * @class Socket
 */
class Socket extends EventEmitter {
    onopen: () => void
    onmessage: (msg: SocketMsg) => void
    conn: WebSocket = null

    constructor() {
        super()
        this.run()
    }

    run() {
        this.onopen = () => {
            const text = 'socket connected !!!'
            socketStore.setSocketIsConnected(true)
            socketStore.addMessage({
                event: 'connect',
                from: 'console',
                data: text
            })
        }

        this.onmessage = (msg: SocketMsg) => {
            if (!msg || !msg.data) {
                return
            }
            socketStore.addMessage({
                event: 'message',
                from: 'server',
                data: typeof msg.data === 'object' ? JSON.stringify(msg.data) : msg.data
            })
        }
    }

    send(data: any, retry = 0) {
        if (this.conn && this.conn.readyState === this.conn.OPEN) {
            this.conn.send(typeof data === 'object' ? JSON.stringify(data) : data)
        } else if (retry < 3) {
            setTimeout(() => {
                this.send(data, retry++)
            }, 300)
        }
    }

    open(url: string) {
        this.conn = new WebSocket(url)
        this.conn.onclose = evt => {
            socketStore.setSocketIsConnected(false)
            const text = `socket close: ${typeof evt === 'object' ? evt.code : ''}`
            socketStore.addMessage({
                event: 'close',
                from: 'console',
                data: text
            })
            clearTimeout(reopenTimer)
            if (!disconnectInitiative) {
                reopenTimer = window.setTimeout(() => {
                    this.open(url)
                }, 3000)
            }
            disconnectInitiative = false
        }
        this.conn.onerror = evt => {
            socketStore.setSocketIsConnected(false)
            const text = `socket error: ${typeof evt === 'object' ? JSON.stringify((evt as any).code) : ''}`
            socketStore.addMessage({
                event: 'error',
                from: 'console',
                data: text
            })
        }

        reaction(
            () => socketStore.socketType,
            (_, __, r) => {
                clearTimeout(reopenTimer)
                r.dispose()
            }
        )

        if (this.onopen) {
            this.conn.onopen = this.onopen
        }
        if (this.onmessage) {
            this.conn.onmessage = this.onmessage
        }
        return this
    }
}

const socketInstance = new Socket()

function canSocketOpen() {
    return !(socketInstance.conn && socketInstance.conn.readyState === socketInstance.conn.OPEN)
}

export function socketConnect(url: string) {
    if (!canSocketOpen()) {
        return message.error('Please disconnect the existing instance!!!')
    }
    socketInstance.open(url)
}

export function socketDisconnect() {
    if (socketInstance.conn && socketInstance.conn.readyState === socketInstance.conn.OPEN) {
        socketInstance.conn.close()
    }
    disconnectInitiative = true
}

export function send(_, data: any) {
    if (!socketInstance.conn && socketInstance.conn.readyState !== socketInstance.conn.OPEN) {
        return message.error('Please connect to server!!!')
    }
    socketInstance.send(data)
    socketStore.addMessage({
        event: null,
        from: 'browser',
        data
    })
}
