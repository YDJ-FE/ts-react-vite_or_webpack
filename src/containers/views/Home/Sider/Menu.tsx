import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Menu, message } from 'antd'
import { MenuInfo } from 'rc-menu/lib/interface'
import { useNavigate, useLocation } from 'react-router-dom'

import styles from './index.module.scss'
import menus, { menusWithRoute, routeMap, routeKeys, RouteMapValue } from './../menu'
import useRootStore from '@store/useRootStore'

function SiderMenu() {
    const navigate = useNavigate()
    const location = useLocation()

    const {
        globalStore: { sideBarTheme, navOpenKeys, setOpenKeys }
    } = useRootStore()

    const selectedKeys = useMemo<string[]>(() => {
        for (const routeKey of routeKeys) {
            const item = routeMap[routeKey]
            if (item.path === location.pathname) {
                return [routeKey]
            }
        }
        return []
    }, [location.pathname])

    const goto = useCallback(
        (info: MenuInfo) => {
            const selectedMenu = menusWithRoute.find(item => item.key === info.key)
            if (!selectedMenu) {
                message.error('菜单不能匹配到路由, 请检查')
            }
            const item = routeMap[selectedMenu.key] as RouteMapValue
            if (item && item.path !== location.pathname) {
                navigate(item.path)
            }
        },
        [location.pathname]
    )

    return (
        <Menu
            className={styles.menu}
            theme={sideBarTheme}
            mode="inline"
            onClick={goto}
            items={menus}
            selectedKeys={selectedKeys}
            onOpenChange={setOpenKeys}
            openKeys={navOpenKeys}
        />
    )
}

export default observer(SiderMenu)
