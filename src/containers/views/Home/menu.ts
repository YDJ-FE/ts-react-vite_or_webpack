import Loadable from 'react-loadable'
import { RouteComponentProps } from 'react-router-dom'

import PageLoading from '@components/PageLoading'

const TestComponentOne = Loadable({
    loader: () => import(/* webpackChunkName: "test-componen-one" */ '@views/TestComponentOne'),
    loading: PageLoading
})

const TestComponentTwo = Loadable({
    loader: () => import(/* webpackChunkName: "test-componen-two" */ '@views/TestComponentTwo'),
    loading: PageLoading
})

interface IMenuItem {
    name: string
    iconType: string
    pathname: string
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
}

const menu: IMenuItem[] = [
    {
        name: 'test1',
        iconType: 'mobile',
        pathname: '/',
        component: TestComponentOne
    },
    {
        name: 'test2',
        iconType: 'file-text',
        pathname: '/test2',
        component: TestComponentTwo
    }
]

export default menu
