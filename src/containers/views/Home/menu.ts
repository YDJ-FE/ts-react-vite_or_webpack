import Loadable from 'react-loadable'

import PageLoading from '@components/PageLoading'

export const asyncComponents = {
    Dashboard: Loadable({
        loader: () => import(/* webpackChunkName: "dashboard" */ '@views/Dashboard'),
        loading: PageLoading
    }),
    Charts: Loadable({
        loader: () => import(/* webpackChunkName: "charts" */ '@views/Charts'),
        loading: PageLoading
    }),
    Users: Loadable({
        loader: () => import(/* webpackChunkName: "users" */ '@views/Users'),
        loading: PageLoading
    })
}

// 所有路由的key
export type AsyncComponentKeys = keyof typeof asyncComponents

export interface IMenu {
    title: string
    id: number
    pid?: number
    path?: string
    icon?: string
    component?: AsyncComponentKeys
    exact?: boolean
}

export interface IMenuInTree extends IMenu {
    children?: IMenuInTree[]
}

export const menu: IMenu[] = [
    {
        id: 1,
        path: '/',
        title: 'Dashboard',
        icon: 'laptop',
        component: 'Dashboard',
        exact: true
    },
    {
        id: 2,
        title: 'Charts',
        icon: 'dot-chart'
    },
    {
        id: 21,
        pid: 2,
        path: '/charts1',
        title: 'Charts1',
        icon: 'dot-chart',
        component: 'Charts',
        exact: true
    },
    {
        id: 22,
        pid: 2,
        path: '/charts2',
        title: 'Charts2',
        icon: 'dot-chart',
        component: 'Charts',
        exact: true
    },
    {
        id: 41,
        pid: 22,
        path: '/charts3',
        title: 'Charts3',
        icon: 'dot-chart',
        component: 'Charts',
        exact: true
    },
    {
        id: 42,
        pid: 22,
        path: '/charts4',
        title: 'Charts4',
        icon: 'dot-chart',
        component: 'Charts',
        exact: true
    },
    {
        id: 3,
        path: '/users',
        title: 'Users',
        icon: 'user',
        component: 'Users',
        exact: true
    }
]

export default menu
