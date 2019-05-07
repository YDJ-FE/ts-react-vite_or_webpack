export enum SOCKET_TYPE {
    SOCKETIO = 'socket.io',
    WEBSOCKET = 'websocket'
}
export const SOCKER_TYPES: SOCKET_TYPE[] = [SOCKET_TYPE.SOCKETIO, SOCKET_TYPE.WEBSOCKET]

export enum DATA_FORMAT_TYPE {
    JSON = 'json',
    TEXT = 'text'
}
export const DATA_FORMATS: DATA_FORMAT_TYPE[] = [DATA_FORMAT_TYPE.JSON, DATA_FORMAT_TYPE.TEXT]
