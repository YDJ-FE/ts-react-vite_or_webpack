import { makeAutoObservable } from 'mobx'

import { LOCALSTORAGE_KEYS } from '@constants/index'
import { SOCKER_TYPES, DATA_FORMATS } from '@constants/socket'

/**
 * socket debugger store
 *
 * @export
 * @class SocketStore
 */
export class SocketStore {
    constructor() {
        makeAutoObservable(this)
    }

    socketType: ISocketStore.SocketType =
        (localStorage.getItem(LOCALSTORAGE_KEYS.SOCKET_TYPE) as ISocketStore.SocketType) || SOCKER_TYPES[0]
    dataFormat: ISocketStore.DataFormatType =
        (localStorage.getItem(LOCALSTORAGE_KEYS.DATA_FORMAT) as ISocketStore.DataFormatType) || DATA_FORMATS[0]
    socketIsConnected = false
    messages: ISocketStore.Message[] = []
    notSupportPolling: boolean = localStorage.getItem(LOCALSTORAGE_KEYS.NOT_SUPPORT_POLLING) === 'true'

    get isSocketIO() {
        return this.socketType === SOCKER_TYPES[0]
    }

    setSocketType = (type: ISocketStore.SocketType) => {
        this.socketType = type
    }

    setDataFormat = (dataFormat: ISocketStore.DataFormatType) => {
        this.dataFormat = dataFormat
    }

    setSocketIsConnected = (socketIsConnected: boolean) => {
        this.socketIsConnected = socketIsConnected
    }

    clearMessages = () => {
        this.messages = []
    }

    addMessage = (message: ISocketStore.Message) => {
        if (!message.time) {
            message.time = new Date().getTime()
        }
        this.messages.push(message)
    }

    setNotSupportPolling = (val: boolean) => {
        this.notSupportPolling = val
        localStorage.setItem(LOCALSTORAGE_KEYS.NOT_SUPPORT_POLLING, String(val))
    }
}

export default new SocketStore()
