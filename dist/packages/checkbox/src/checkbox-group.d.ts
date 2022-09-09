import { type Ref } from 'vue';
import { type ListType } from './checkbox-group-props';
export declare const ProvideCheckboxKey: unique symbol;
export declare const ProvideCheckboxDisabled: unique symbol;
export declare const ProvideCheckboxBorder: unique symbol;
export declare const ProvideCheckboxMin: unique symbol;
export declare const ProvideCheckboxMax: unique symbol;
export declare type ModelValue<T = ListType> = Ref<T>;
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: import("vue").PropType<ListType>;
    };
    value: import("vue").PropType<ListType>;
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    min: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: import("vue").PropType<ListType>;
    };
    value: import("vue").PropType<ListType>;
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    min: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    disabled: boolean;
    border: boolean;
    min: number;
    max: number;
}>;
export default _default;
