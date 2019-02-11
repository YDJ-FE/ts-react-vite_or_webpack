import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'
import { Menu, Icon } from 'antd'
import pathToRegexp from 'path-to-regexp'

import * as styles from './index.scss'
import menu, { IMenu, IMenuInTree } from './../menu'
import { arrayToTree, queryArray } from '@utils/index'

const { SubMenu } = Menu

interface IStoreProps {
    sideBarCollapsed?: boolean
    sideBarTheme?: IGlobalStore.SideBarTheme
    navOpenKeys?: string[]
    setOpenKeys?: (openKeys: string[]) => void
    userInfo?: IAuthStore.UserInfo
    routerStore?: RouterStore
}

@inject(
    (store: IStore): IStoreProps => {
        const { routerStore, globalStore, authStore } = store
        const { userInfo } = authStore
        const { sideBarTheme, sideBarCollapsed, navOpenKeys, setOpenKeys } = globalStore
        return {
            routerStore,
            userInfo,
            sideBarTheme,
            sideBarCollapsed,
            navOpenKeys,
            setOpenKeys
        }
    }
)
@observer
class SiderMenu extends React.Component<IStoreProps> {
    // 打开的菜单层级记录
    private levelMap: NumberObject = {}

    @computed
    get currentRoute() {
        return this.props.routerStore.location.pathname
    }

    @computed
    get menuTree() {
        return arrayToTree<IMenuInTree>(menu, 'id', 'pid')
    }

    @computed
    get menuProps() {
        const { sideBarCollapsed, navOpenKeys } = this.props
        return !sideBarCollapsed
            ? {
                  onOpenChange: this.onOpenChange,
                  openKeys: navOpenKeys
              }
            : {}
    }

    goto = ({ key }: { key: string }) => {
        const { history } = this.props.routerStore
        const selectedMenu = menu.find(item => String(item.id) === key)
        if (selectedMenu && selectedMenu.path && selectedMenu.path !== this.currentRoute) {
            history.push(selectedMenu.path)
        }
    }

    onOpenChange = (openKeys: string[]): void => {
        const { navOpenKeys, setOpenKeys } = this.props
        const latestOpenKey = openKeys.find(key => !navOpenKeys.includes(key))
        const latestCloseKey = navOpenKeys.find(key => !openKeys.includes(key))
        let nextOpenKeys = []
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey)
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey)
        }
        setOpenKeys(nextOpenKeys)
    }

    getPathArray = (array: IMenu[], current: IMenu): string[] => {
        const result = [String(current.id)]
        const getPath = (item: IMenu): void => {
            if (item && item.pid) {
                result.unshift(String(item.pid))
                getPath(queryArray(array, String(item.pid), 'id'))
            }
        }
        getPath(current)
        return result
    }

    // 保持选中
    getAncestorKeys = (key: string): string[] => {
        const map = {}
        const getParent = index => {
            const result = [String(this.levelMap[index])]
            if (this.levelMap[result[0]]) {
                result.unshift(getParent(result[0])[0])
            }
            return result
        }
        for (const index in this.levelMap) {
            if ({}.hasOwnProperty.call(this.levelMap, index)) {
                map[index] = getParent(index)
            }
        }
        return map[key] || []
    }

    // 递归生成菜单
    getMenus = (menuTree: IMenuInTree[]) => {
        return menuTree.map(item => {
            if (item.children) {
                if (item.pid) {
                    this.levelMap[item.id] = item.pid
                }
                return (
                    <SubMenu
                        key={String(item.id)}
                        title={
                            <span>
                                {item.icon && <Icon type={item.icon} />}
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenus(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item key={String(item.id)}>
                    {item.icon && <Icon type={item.icon} />}
                    <span>{item.title}</span>
                </Menu.Item>
            )
        })
    }

    render() {
        this.levelMap = {}
        const { sideBarTheme } = this.props
        const menuItems = this.getMenus(this.menuTree)
        // 寻找选中路由
        let currentMenu: IMenu = null
        for (const item of menu) {
            if (item.path && pathToRegexp(item.path).exec(this.currentRoute)) {
                currentMenu = item
                break
            }
        }
        let selectedKeys: string[] = null
        if (currentMenu) {
            selectedKeys = this.getPathArray(menu, currentMenu)
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
                onClick={this.goto}
                {...this.menuProps}
            >
                {menuItems}
            </Menu>
        )
    }
}

export default SiderMenu
