import { App } from 'vue';
declare type RegisterOptions = {
    prefix?: string;
    components?: any[];
};
declare type Instance = {
    prefix: string;
    install: (app: App) => void;
};
export declare function register({ prefix, components }?: RegisterOptions): Instance;
export {};
