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

const TestComponentFour = Loadable({
    loader: () => import(/* webpackChunkName: "test-componen-four" */ '@views/TestComponentFour'),
    loading: PageLoading
})

export const menu = [
    {
        path: '/',
        component: TestComponentOne,
        permissions: ['user', 'admin'],
        unauthorized: NotAuthRouteComponent,
        exact: true
    },
    {
        path: '/test2',
        component: TestComponentTwo,
        permissions: ['user'],
        unauthorized: NotAuthRouteComponent,
        exact: true
    },
    {
        path: '/test3',
        component: TestComponentThree,
        permissions: ['admin'],
        unauthorized: NotAuthRouteComponent,
        exact: true
    },
    {
        path: '/test4',
        component: TestComponentFour,
        permissions: ['user'],
        unauthorized: NotAuthRouteComponent,
        exact: true
    }
]

export default menu
