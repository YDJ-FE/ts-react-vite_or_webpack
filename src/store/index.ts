import { RouterStore } from 'mobx-react-router'

export const routerStore = new RouterStore()

export { default as socketStore } from './socketStore'
export { default as globalStore } from './globalStore'
export { default as authStore } from './authStore'
export { default as userStore } from './userStore'
