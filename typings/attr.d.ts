import * as React from 'react'

declare module 'react' {
    interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
        referrerPolicy?: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'unsafe-url'
    }
}
