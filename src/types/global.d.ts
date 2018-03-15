declare var process: {
    env: {
        NODE_ENV: string
        APP_ENV: string
        BASEURL: string
    }
}

declare interface PlainObject {
    [propName: string]: any
}

declare interface BooleanObject {
    [propName: string]: boolean
}

declare interface StringObject {
    [propName: string]: string
}

declare interface NumberObject {
    [propName: string]: number
}
