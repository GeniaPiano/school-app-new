/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_STRIPE_KEY: string
    readonly VITE_REACT_APP_API_TOKEN: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

