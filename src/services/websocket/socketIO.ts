import io, { Manager, Socket } from 'socket.io-client'
import socketioWildcard from 'socketio-wildcard'
import { message } from 'antd'
import { reaction } from 'mobx'

import { socketStore } from '@store/index'

const patch = socketioWildcard(Manager)

/**
 * socket 通信
 *
 * @export
 * @class Socket
 */
class _Socket {
    socket: Socket

    send(event: string, data: any, retry = 0) {
        if (this.socket && this.socket.connected) {
            this.socket.emit(event, data)
        } else if (retry < 3) {
            setTimeout(() => {
                this.send(data, retry++)
            }, 300)
        }
    }

    open(url: string) {
        const transports = ['websocket']
        if (!socketStore.notSupportPolling) {
            transports.unshift('polling')
        }
        this.socket = io(url, {
            reconnectionDelay: 1000,
            reconnection: true,
            reconnectionAttempts: 5,
            transports
        })

        patch(this.socket)

        reaction(
            () => socketStore.socketType,
            (_, __, r) => {
                this.socket.close()
                r.dispose()
            }
        )

        this.socket.on('reconnect', attemptNumber => {
            const text = `socket reconnect after attempt ${attemptNumber} times !!!`
            socketStore.addMessage({
                event: 'reconnect',
                from: 'console',
                data: text
            })
        })

        // 被断开, 不重连
        this.socket.on('disconnect', reason => {
            socketStore.setSocketIsConnected(false)
            const text = `socket disconnect because: ${reason} !!!`
            socketStore.addMessage({
                event: 'disconnect',
                from: 'console',
                data: text
            })
        })

        this.socket.on('connect_timeout', timeout => {
            const text = `socket connect_timeout: ${timeout} !!!`
            socketStore.addMessage({
                event: 'connect_timeout',
                from: 'console',
                data: text
            })
        })

        // 连接错误
        this.socket.on('connect_error', err => {
            const text = 'socket connect_error !!!'
            socketStore.addMessage({
                event: 'connect_error',
                from: 'console',
                data: text
            })
            console.warn(err)
        })

        // 错误捕获
        this.socket.on('error', err => {
            socketStore.setSocketIsConnected(false)
            const text = 'socket error !!!'
            socketStore.addMessage({
                event: 'error',
                from: 'console',
                data: text
            })
            console.warn(err)
        })

        this.socket.on('connect', () => {
            socketStore.setSocketIsConnected(true)
            const text = 'socket connected !!!'
            socketStore.addMessage({
                event: 'connect',
                from: 'console',
                data: text
            })
        })

        this.socket.on('ping', () => {
            socketStore.addMessage({
                event: 'ping',
                from: 'browser',
                data: null
            })
        })

        this.socket.on('pong', () => {
            socketStore.addMessage({
                event: 'pong',
                from: 'server',
                data: null
            })
        })

        this.socket.on('*', pkg => {
            console.log('on all socket callback: ', pkg)
            if (pkg && pkg.data instanceof Array && pkg.data.length > 1) {
                const event = pkg.data[0]
                const data = pkg.data[1]
                socketStore.addMessage({
                    event,
                    from: 'server',
                    data
                })
            }
        })
    }
}

const socketInstance = new _Socket()

function canSocketOpen() {
    return !(socketInstance.socket && socketInstance.socket.connected)
}

export function socketConnect(url: string) {
    if (!canSocketOpen()) {
        return message.error('Please disconnect the existing instance!!!')
    }
    socketInstance.open(url)
}

export function socketDisconnect() {
    if (socketInstance.socket && socketInstance.socket.connected) {
        socketInstance.socket.close()
    }
}

export function send(event: string, data: any) {
    if (!socketInstance.socket || !socketInstance.socket.connected) {
        return message.error('Please connect to server!!!')
    }
    socketInstance.send(event, data)
    socketStore.addMessage({
        event,
        from: 'browser',
        data
    })
}
