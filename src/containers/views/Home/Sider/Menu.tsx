import React, { useCallback, useMemo, useRef } from 'react'
import { observer } from 'mobx-react'
import { Menu } from 'antd'
import { pathToRegexp } from 'path-to-regexp'
import { MenuInfo } from 'rc-menu/lib/interface'
import { useNavigate, useLocation } from 'react-router-dom'

import styles from './index.module.scss'
import { arrayToTree, queryArray } from '@utils/index'
import menu, { IMenu, IMenuInTree } from './../menu'
import useRootStore from '@store/useRootStore'

const { SubMenu } = Menu

function SiderMenu() {
    const navigate = useNavigate()
    const location = useLocation()
    const levelMap = useRef<NumberObject>({})

    const {
        globalStore: { sideBarTheme, sideBarCollapsed, navOpenKeys, setOpenKeys }
    } = useRootStore()

    const menuTree = useMemo(() => arrayToTree<IMenuInTree>(menu, 'id', 'pid'), [])

    const getAncestorKeys = useCallback((key: string) => {
        const map = {}
        const getParent = (index: string) => {
            const result = [String(levelMap.current[index])]
            if (levelMap.current[result[0]]) {
                result.unshift(getParent(result[0])[0])
            }
            return result
        }
        for (const index in levelMap.current) {
            if ({}.hasOwnProperty.call(levelMap.current, index)) {
                map[index] = getParent(index)
            }
        }
        return map[key] || []
    }, [])

    const onOpenChange = useCallback(
        (openKeys: string[]) => {
            const latestOpenKey = openKeys.find(key => !navOpenKeys.includes(key))
            const latestCloseKey = navOpenKeys.find(key => !openKeys.includes(key))
            let nextOpenKeys = []
            if (latestOpenKey) {
                nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey)
            }
            if (latestCloseKey) {
                nextOpenKeys = getAncestorKeys(latestCloseKey)
            }
            setOpenKeys(nextOpenKeys)
        },
        [navOpenKeys, getAncestorKeys]
    )

    const menuProps = useMemo(() => {
        return !sideBarCollapsed ? { onOpenChange, openKeys: navOpenKeys } : {}
    }, [sideBarCollapsed, navOpenKeys, onOpenChange])

    const getPathArray = useCallback((array: IMenu[], current: IMenu): string[] => {
        const result = [String(current.id)]
        const getPath = (item: IMenu): void => {
            if (item && item.pid) {
                result.unshift(String(item.pid))
                getPath(queryArray(array, String(item.pid), 'id'))
            }
        }
        getPath(current)
        return result
    }, [])

    const goto = useCallback(
        (info: MenuInfo) => {
            const selectedMenu = menu.find(item => String(item.id) === info.key)
            if (selectedMenu && selectedMenu.path && selectedMenu.path !== location.pathname) {
                navigate(selectedMenu.path)
            }
        },
        [location.pathname]
    )

    const getMenus = useCallback((menuTree: IMenuInTree[]) => {
        return menuTree.map(item => {
            if (item.children) {
                if (item.pid) {
                    levelMap.current[item.id] = item.pid
                }
                return (
                    <SubMenu
                        key={String(item.id)}
                        title={
                            <span>
                                {item.icon}
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {getMenus(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item key={String(item.id)}>
                    {item.icon}
                    <span>{item.title}</span>
                </Menu.Item>
            )
        })
    }, [])

    levelMap.current = {}
    const menuItems = getMenus(menuTree)
    // 寻找选中路由
    let currentMenu: IMenu = null
    for (const item of menu) {
        if (item.path && pathToRegexp(item.path).exec(location.pathname)) {
            currentMenu = item
            break
        }
    }
    let selectedKeys: string[] = null
    if (currentMenu) {
        selectedKeys = getPathArray(menu, currentMenu)
    }
    if (!selectedKeys) {
        selectedKeys = ['1']
    }
    return (
        <Menu
            className={styles.menu}
            theme={sideBarTheme}
            mode="inline"
            selectedKeys={selectedKeys}
            onClick={goto}
            {...menuProps}
        >
            {menuItems}
        </Menu>
    )
}

export default observer(SiderMenu)
