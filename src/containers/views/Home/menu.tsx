import React, { lazy } from 'react'
import { CoffeeOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { ItemType } from 'antd/lib/menu/hooks/useItems'

export type RouteMapValue = {
    component: React.LazyExoticComponent<() => JSX.Element>
    path: string
}

export const routeMap = {
    SocketDebugger: {
        component: lazy(() => import('@views/SocketDebugger')),
        path: '/'
    },
    Users: {
        component: lazy(() => import('@views/Users')),
        path: '/users'
    },
    DouyinVideo: {
        component: lazy(() => import('@views/DouyinVideo')),
        path: '/dy-v'
    }
}

/**
 * menu
 * PS: 有路由时, key必须与routeMap对应, 否则不能匹配跳转
 */
const menus: ItemType[] = [
    { key: 'SocketDebugger', label: 'SocketDebugger', icon: <CoffeeOutlined /> },
    { key: 'DouyinVideo', label: 'dy', icon: <VideoCameraOutlined /> },
    { key: 'Users', label: 'Users', icon: <UserOutlined /> }
]

export default menus

/**
 * all routers key
 */
export type RouteMapKey = keyof typeof routeMap

/**
 * all routers key
 */
export const routeKeys = Object.keys(routeMap) as RouteMapKey[]

/**
 * 带跳转地址的menu
 */
export const menusWithRoute: ItemType[] = []
// 递归寻找
function match(items: ItemType[]) {
    items.forEach(function (item) {
        if (routeKeys.includes(item.key as RouteMapKey)) {
            menusWithRoute.push(item)
        }
        const children = (item as any).children as ItemType[]
        if (Array.isArray(children)) {
            match(children)
        }
    })
}
match(menus)
