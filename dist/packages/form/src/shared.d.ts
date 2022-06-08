import { Rules, Values } from 'async-validator';
import { InjectionKey } from 'vue';
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
