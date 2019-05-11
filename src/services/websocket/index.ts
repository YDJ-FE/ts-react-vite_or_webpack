import { socketStore } from '@store/index'
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
    return socketStore.isSocketIO ? socketConnectFromSocketIO(url) : socketConnectFromWebsocket(url)
}

export const socketDisconnect = () => {
    return socketStore.isSocketIO ? socketDisconnectFromSocketIO() : socketDisconnectFromWebsocket()
}

export const send = (event: string, data: any) => {
    return socketStore.isSocketIO ? sendFromSocketIO(event, data) : sendFromWebsocket(event, data)
}
