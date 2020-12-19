import React from 'react'
import Loadable from '@loadable/component'
import { CoffeeOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'

import PageLoading from '@components/PageLoading'

const loadComponent = (loader: () => Promise<any>) => Loadable(loader, { fallback: <PageLoading /> })

export const asynchronousComponents = {
    SocketDebugger: loadComponent(() => import(/* webpackChunkName: "socket-debugger" */ '@views/SocketDebugger')),
    Users: loadComponent(() => import(/* webpackChunkName: "users" */ '@views/Users')),
    DouyinVideo: loadComponent(() => import(/* webpackChunkName: "douyin-video" */ '@views/DouyinVideo'))
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
