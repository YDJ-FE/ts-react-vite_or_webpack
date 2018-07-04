import * as React from 'react'
import { message, notification } from 'antd'

import * as api from '@services/api'

/**
 * 扩展组件/store类以方便调用
 * 集成api, 公用组件
 */
export class ComponentExt<P = {}, S = {}> extends React.Component<P, S> {
    readonly api = api
    readonly $message = message
    readonly $notification = notification
}

export class StoreExt {
    readonly api = api
    readonly $message = message
    readonly $notification = notification
}
