import Loadable from 'react-loadable'
import { IRouteConfig } from 'react-authorized'

import PageLoading from '@components/PageLoading'
import Error from '@components/Error'

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

interface IRoute extends IRouteConfig {
    pathName?: string
    iconType?: string
}

export const menu: IRoute[] = [
    {
        path: '/',
        component: TestComponentOne,
        permissions: [],
        unauthorized: Error,
        pathName: 'Test1',
        exact: true,
        iconType: 'mobile'
    },
    {
        path: '/test2',
        component: TestComponentTwo,
        permissions: ['user'],
        unauthorized: Error,
        pathName: 'Test2',
        exact: true,
        iconType: 'retweet'
    },
    {
        path: '/test3',
        component: TestComponentThree,
        permissions: [],
        unauthorized: Error,
        pathName: 'Test3',
        exact: true,
        iconType: 'retweet'
    },
    {
        path: '/test4',
        component: TestComponentFour,
        permissions: [],
        unauthorized: Error,
        pathName: 'Test4',
        exact: true,
        iconType: 'retweet'
    }
]

export default menu
