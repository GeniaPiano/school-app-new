

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ENV_KEY: string;
        }
    }
}
