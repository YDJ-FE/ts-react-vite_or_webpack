import * as React from 'react'
import { Message, Notification } from 'element-react'

import * as api from './api'

/**
 * 扩展组件/store类以方便调用
 * 集成api, 公用组件
 */
export class ComponentExt<P = {}, S = {}> extends React.Component<P, S> {
    readonly api = api
    readonly $message = Message
    readonly $notification = Notification
}

export class StoreExt {
    readonly api = api
    readonly $message = Message
    readonly $notification = Notification
}
