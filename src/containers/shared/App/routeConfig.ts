import { IRouteConfig } from 'react-authorized'

// pages
import Home from '@views/Home'
import Login from '@views/Login'

interface IRoute extends IRouteConfig {
    // 路由对应的名称
    pathName?: string
}

export const normalRoutes: IRoute[] = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/',
        component: Home
    }
]
