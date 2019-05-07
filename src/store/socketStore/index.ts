import { observable, action, computed } from 'mobx'

import { StoreExt } from '@utils/reactExt'
import { LOCALSTORAGE_KEYS } from '@constants/index'
import { SOCKER_TYPES, DATA_FORMATS } from '@constants/socket'

/**
 * socket debugger store
 *
 * @export
 * @class SocketStore
 * @extends {StoreExt}
 */
export class SocketStore extends StoreExt {
    @observable
    socketType: ISocketStore.SocketType =
        (localStorage.getItem(LOCALSTORAGE_KEYS.SOCKET_TYPE) as ISocketStore.SocketType) || SOCKER_TYPES[0]
    @observable
    dataFormat: ISocketStore.DataFormatType =
        (localStorage.getItem(LOCALSTORAGE_KEYS.DATA_FORMAT) as ISocketStore.DataFormatType) || DATA_FORMATS[0]
    @observable
    socketIsConnected: boolean = false
    @observable
    messages: ISocketStore.Message[] = []
    @observable
    notSupportPolling: boolean = localStorage.getItem(LOCALSTORAGE_KEYS.NOT_SUPPORT_POLLING) === 'true'

    @computed
    get isSocketIO() {
        return this.socketType === SOCKER_TYPES[0]
    }

    @action
    setSocketType = (type: ISocketStore.SocketType) => {
        this.socketType = type
    }

    @action
    setDataFormat = (dataFormat: ISocketStore.DataFormatType) => {
        this.dataFormat = dataFormat
    }

    @action
    setSocketIsConnected = (socketIsConnected: boolean) => {
        this.socketIsConnected = socketIsConnected
    }

    @action
    clearMessages = () => {
        this.messages = []
    }

    @action
    addMessage = (message: ISocketStore.Message) => {
        if (!message.time) {
            message.time = new Date().getTime()
        }
        this.messages.push(message)
    }

    @action
    setNotSupportPolling = (val: boolean) => {
        this.notSupportPolling = val
        localStorage.setItem(LOCALSTORAGE_KEYS.NOT_SUPPORT_POLLING, String(val))
    }
}

export default new SocketStore()
