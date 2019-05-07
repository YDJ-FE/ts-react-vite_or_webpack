import * as store from 'store'
import {
    socketConnect as socketConnectFromSocketIO,
    socketDisconnect as socketDisconnectFromSocketIO,
    send as sendFromSocketIO
} from './socketIO'
import {
    socketConnect as socketConnectFromWebsocket,
    socketDisconnect as socketDisconnectFromWebsocket,
    send as sendFromWebsocket
} from './websocket'

export const socketConnect = (url: string) => {
    return store.globalStore.isSocketIO ? socketConnectFromSocketIO(url) : socketConnectFromWebsocket(url)
}

export const socketDisconnect = () => {
    return store.globalStore.isSocketIO ? socketDisconnectFromSocketIO() : socketDisconnectFromWebsocket()
}

export const send = (event: string, data: any) => {
    return store.globalStore.isSocketIO ? sendFromSocketIO(event, data) : sendFromWebsocket(event, data)
}
