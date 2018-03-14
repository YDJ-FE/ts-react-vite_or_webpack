declare var require: {
    <T>(path: string): T
    (paths: string[], callback: (...modules: any[]) => void): void
    ensure: (
        paths: string[],
        callback: (require: <T>(path: string) => T) => void,
        chunkName?: string
    ) => void
}

declare var process: {
    env: {
        NODE_ENV: string
        APP_ENV: string
    }
}

declare interface ObjectConstructor {
    assign(target: any, ...sources: any[]): any
}

declare interface RequireImport {
    default: any
}
