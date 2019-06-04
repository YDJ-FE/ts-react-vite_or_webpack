import React, { createContext, ReactElement } from 'react'
import { Observer } from 'mobx-react'

import * as store from '@store/index'

interface ChildrenProps<T> {
    children: (value: T) => ReactElement<any>
}

export const RootContext = createContext<IStore>(null)

/**
 * 已包含Observer
 * @param param0
 */
export const RootConsumer = ({ children }: ChildrenProps<IStore>) => <Observer>{() => children(store)}</Observer>

export default function Provider({ children }: { children?: React.ReactNode }) {
    return <RootContext.Provider value={{ ...store }}>{children}</RootContext.Provider>
}
