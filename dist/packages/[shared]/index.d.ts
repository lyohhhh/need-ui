import { Rules, Values } from 'async-validator';
import { InjectionKey } from 'vue';
declare const _default: () => void;
export default _default;
export declare type Type = 'success' | 'default' | 'warning' | 'primary' | 'danger';
export declare type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
export declare type Validate = (valid: boolean) => void;
export declare type FormType = {
    validate: (cb: (isValid: boolean) => void) => void;
};
export declare type FormItem = {
    validate: () => Promise<Values>;
};
export declare type FormProp = {
    model: Record<string, unknown>;
    rules?: Rules;
};
export declare const key: InjectionKey<FormProp>;
