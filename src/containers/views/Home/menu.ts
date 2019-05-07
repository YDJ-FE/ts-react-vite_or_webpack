import Loadable from 'react-loadable'

import PageLoading from '@components/PageLoading'

const loadComponent = (loader: () => Promise<any>) => Loadable({ loader, loading: PageLoading })

export const asynchronousComponents = {
    SocketDebugger: loadComponent(() => import(/* webpackChunkName: "socket-debugger" */ '@views/SocketDebugger')),
    Users: loadComponent(() => import(/* webpackChunkName: "users" */ '@views/Users'))
}

// all routers key
export type AsynchronousComponentKeys = keyof typeof asynchronousComponents

export interface IMenu {
    title: string
    id: number
    pid?: number
    path?: string
    icon?: string
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
        icon: 'coffee',
        component: 'SocketDebugger',
        exact: true
    },
    {
        id: 2,
        path: '/users',
        title: 'Users',
        icon: 'user',
        component: 'Users',
        exact: true
    }
]

export default menu
