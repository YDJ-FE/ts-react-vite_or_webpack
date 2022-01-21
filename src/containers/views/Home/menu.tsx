import React from 'react'
import loadable from '@loadable/component'
import { CoffeeOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'

import PageLoading from '@components/PageLoading'

const loadableOptions = { fallback: <PageLoading /> }
export const asynchronousComponents = {
    SocketDebugger: loadable(() => import('@views/SocketDebugger'), loadableOptions),
    Users: loadable(() => import('@views/Users'), loadableOptions),
    DouyinVideo: loadable(() => import('@views/DouyinVideo'), loadableOptions)
}

// all routers key
export type AsynchronousComponentKeys = keyof typeof asynchronousComponents

export interface IMenu {
    title: string
    id: number
    pid?: number
    path?: string
    icon?: JSX.Element
    component?: AsynchronousComponentKeys
    exact?: boolean
}

export interface IMenuInTree extends IMenu {
    children?: IMenuInTree[]
}

export const menu: IMenu[] = [
    {
        id: 1,
        path: '/',
        title: 'SocketDebugger',
        icon: <CoffeeOutlined />,
        component: 'SocketDebugger',
        exact: true
    },
    {
        id: 3,
        path: '/dy-v',
        title: 'dy',
        icon: <VideoCameraOutlined />,
        component: 'DouyinVideo',
        exact: true
    },
    {
        id: 2,
        path: '/users',
        title: 'Users',
        icon: <UserOutlined />,
        component: 'Users',
        exact: true
    }
]

export default menu
