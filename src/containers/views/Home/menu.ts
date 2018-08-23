import Loadable from 'react-loadable'
import { IRouteConfig } from 'react-authorized'

import PageLoading from '@components/PageLoading'
import NotAuthRouteComponent from '@shared/NotAuthRouteComponent'

const TestComponentOne = Loadable({
    loader: () => import(/* webpackChunkName: "test-componen-one" */ '@views/TestComponentOne'),
    loading: PageLoading
})

const TestComponentTwo = Loadable({
    loader: () => import(/* webpackChunkName: "test-componen-two" */ '@views/TestComponentTwo'),
    loading: PageLoading
})

const TestComponentThree = Loadable({
    loader: () => import(/* webpackChunkName: "test-componen-three" */ '@views/TestComponentThree'),
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
        component: TestComponentOne,
        permissions: ['user', 'admin'],
        unauthorized: NotAuthRouteComponent,
        exact: true
    },
    {
        path: '/test2',
        title: 'Users',
        icon: 'user',
        component: TestComponentTwo,
        permissions: ['user'],
        unauthorized: NotAuthRouteComponent,
        exact: true
    },
    {
        path: '/test3',
        title: 'Charts',
        icon: 'dot-chart',
        component: TestComponentThree,
        permissions: ['admin'],
        unauthorized: NotAuthRouteComponent,
        exact: true
    }
]

export default menu
