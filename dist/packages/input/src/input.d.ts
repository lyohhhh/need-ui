declare const _default: import("vue").DefineComponent<{
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    value: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    error: {
        type: BooleanConstructor;
        default: boolean;
    };
    errorPlaceholder: {
        type: StringConstructor;
        default: string;
    };
    prefixIcon: StringConstructor;
    suffixIcon: StringConstructor;
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        required: boolean;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    value: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    error: {
        type: BooleanConstructor;
        default: boolean;
    };
    errorPlaceholder: {
        type: StringConstructor;
        default: string;
    };
    prefixIcon: StringConstructor;
    suffixIcon: StringConstructor;
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        required: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    placeholder: string;
    clearable: boolean;
    disabled: boolean;
    value: string;
    type: string;
    error: boolean;
    errorPlaceholder: string;
}>;
export default _default;
