/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_ENV: string
    readonly VITE_BASEURL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
