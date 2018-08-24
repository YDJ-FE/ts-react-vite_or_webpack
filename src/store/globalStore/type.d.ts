import { GlobalStore as GlobalStoreModel } from './index'

export as namespace IGlobalStore

export interface GlobalStore extends GlobalStoreModel {}

export type SideBarTheme = 'dark' | 'light'
