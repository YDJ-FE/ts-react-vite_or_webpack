import Loadable from 'react-loadable'

import PageLoading from '@components/PageLoading'

const loadComponent = (loader: () => Promise<any>) =>
    Loadable({
        loader,
        loading: PageLoading
    })

export const asynchronousComponents = {
    Dashboard: loadComponent(() => import(/* webpackChunkName: "dashboard" */ '@views/Dashboard')),
    ChartAreaStack: loadComponent(() => import(/* webpackChunkName: "chart-area-stack" */ '@views/Charts/AreaStack')),
    ChartLineSmooth: loadComponent(() =>
        import(/* webpackChunkName: "chart-line-smooth" */ '@views/Charts/LineSmooth')
    ),
    ChartPie: loadComponent(() => import(/* webpackChunkName: "chart-pie" */ '@views/Charts/Pie')),
    Users: loadComponent(() => import(/* webpackChunkName: "users" */ '@views/Users'))
}

// 所有路由的key
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
        title: 'Dashboard',
        icon: 'dashboard',
        component: 'Dashboard',
        exact: true
    },
    {
        id: 2,
        title: 'ECharts',
        icon: 'bar-chart'
    },
    {
        id: 21,
        pid: 2,
        title: 'Line-Chart',
        icon: 'line-chart'
    },
    {
        id: 212,
        pid: 21,
        path: '/area-stack',
        title: 'Area-Stack',
        component: 'ChartAreaStack',
        exact: true
    },
    {
        id: 211,
        pid: 21,
        path: '/line-smooth',
        title: 'Line-Smooth',
        component: 'ChartLineSmooth',
        exact: true
    },
    {
        id: 22,
        pid: 2,
        path: '/pie-chart',
        title: 'Pie-Chart',
        icon: 'pie-chart',
        component: 'ChartPie',
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
