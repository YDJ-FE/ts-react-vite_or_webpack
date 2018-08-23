import Loadable from 'react-loadable'
import { IRouteConfig } from 'react-authorized'

import PageLoading from '@components/PageLoading'
import NotAuthRouteComponent from '@shared/NotAuthRouteComponent'

const Dashboard = Loadable({
    loader: () => import(/* webpackChunkName: "dashboard" */ '@views/Dashboard'),
    loading: PageLoading
})

const Charts = Loadable({
    loader: () => import(/* webpackChunkName: "charts" */ '@views/Charts'),
    loading: PageLoading
})

const Users = Loadable({
    loader: () => import(/* webpackChunkName: "users" */ '@views/Users'),
    loading: PageLoading
})

interface IRouteConfigInMenu extends IRouteConfig {
    icon: string
    title: string
}

export const menu: IRouteConfigInMenu[] = [
    {
        path: '/',
        title: 'Dashboard',
        icon: 'laptop',
        component: Dashboard,
        permissions: ['user', 'admin'],
        unauthorized: NotAuthRouteComponent,
        exact: true
    },
    {
        path: '/charts',
        title: 'Charts',
        icon: 'dot-chart',
        component: Charts,
        permissions: ['user', 'admin'],
        unauthorized: NotAuthRouteComponent,
        exact: true
    },
    {
        path: '/users',
        title: 'Users',
        icon: 'user',
        component: Users,
        permissions: ['admin'],
        unauthorized: NotAuthRouteComponent,
        exact: true
    }
]

export default menu
