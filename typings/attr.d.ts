import * as React from 'react'

type PropsWithChildrenOnly = React.PropsWithChildren<unknown>
declare module 'react' {
    interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
        referrerPolicy?:
            | 'no-referrer'
            | 'no-referrer-when-downgrade'
            | 'origin'
            | 'origin-when-cross-origin'
            | 'unsafe-url'
    }

    type ReactFCWithChildren = React.FC<PropsWithChildrenOnly>
}
