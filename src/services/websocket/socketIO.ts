/* tslint:disable:no-console */

import io from 'socket.io-client'
import socketioWildcard from 'socketio-wildcard'
import { message } from 'antd'
import { reaction } from 'mobx'

import * as store from 'store'

const patch = socketioWildcard(io.Manager)

/**
 * socket 通信
 *
 * @export
 * @class Socket
 */
class Socket {
    socket: SocketIOClient.Socket

    send(event: string, data, retry = 0) {
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
        if (!store.globalStore.notSupportPolling) {
            transports.unshift('polling')
        }
        this.socket = io.connect(url, {
            reconnectionDelay: 1000,
            reconnection: true,
            reconnectionAttempts: 5,
            transports
        })

        patch(this.socket)

        reaction(
            () => store.globalStore.socketType,
            (_, r) => {
                this.socket.close()
                r.dispose()
            }
        )

        this.socket.on('reconnect', attemptNumber => {
            const text = `socket reconnect after attempt ${attemptNumber} times !!!`
            store.globalStore.addMessage({
                event: 'reconnect',
                from: 'console',
                data: text
            })
        })

        // 被断开, 不重连
        this.socket.on('disconnect', reason => {
            store.globalStore.changeSocketIsConnected(false)
            const text = `socket disconnect because: ${reason} !!!`
            store.globalStore.addMessage({
                event: 'disconnect',
                from: 'console',
                data: text
            })
        })

        this.socket.on('connect_timeout', timeout => {
            const text = `socket connect_timeout: ${timeout} !!!`
            store.globalStore.addMessage({
                event: 'connect_timeout',
                from: 'console',
                data: text
            })
        })

        // 连接错误
        this.socket.on('connect_error', err => {
            const text = 'socket connect_error !!!'
            store.globalStore.addMessage({
                event: 'connect_error',
                from: 'console',
                data: text
            })
            console.warn(err)
        })

        // 错误捕获
        this.socket.on('error', err => {
            store.globalStore.changeSocketIsConnected(false)
            const text = 'socket error !!!'
            store.globalStore.addMessage({
                event: 'error',
                from: 'console',
                data: text
            })
            console.warn(err)
        })

        this.socket.on('connect', () => {
            store.globalStore.changeSocketIsConnected(true)
            const text = 'socket connected !!!'
            store.globalStore.addMessage({
                event: 'connect',
                from: 'console',
                data: text
            })
        })

        this.socket.on('ping', () => {
            store.globalStore.addMessage({
                event: 'ping',
                from: 'browser',
                data: null
            })
        })

        this.socket.on('pong', () => {
            store.globalStore.addMessage({
                event: 'pong',
                from: 'server',
                data: null
            })
        })

        this.socket.on('*', pkg => {
            console.log('监听所有socket事件的回调: ', pkg)
            if (pkg && pkg.data instanceof Array && pkg.data.length > 1) {
                const event = pkg.data[0]
                const data = pkg.data[1]
                store.globalStore.addMessage({
                    event,
                    from: 'server',
                    data
                })
            }
        })
    }
}

const socketInstance = new Socket()

function canSocketOpen() {
    if (socketInstance.socket && socketInstance.socket.connected) {
        return false
    }
    return true
}

export function socketConnect(url: string) {
    if (!canSocketOpen()) {
        return message.error('请先断开已存在的socketIO连接!!!')
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
        return message.error('请先连接socket!!!')
    }
    socketInstance.send(event, data)
    store.globalStore.addMessage({
        event,
        from: 'browser',
        data
    })
}
