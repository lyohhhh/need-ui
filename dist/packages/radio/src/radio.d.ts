import '../styles/radio.scss';
declare const _default: import("vue").DefineComponent<{
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        required: boolean;
    };
    name: StringConstructor;
    border: BooleanConstructor;
    label: {
        type: (StringConstructor | NumberConstructor)[];
        required: boolean;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        required: boolean;
    };
    name: StringConstructor;
    border: BooleanConstructor;
    label: {
        type: (StringConstructor | NumberConstructor)[];
        required: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    disabled: boolean;
    border: boolean;
}>;
export default _default;
