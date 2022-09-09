export declare const ProvideSelectDisabled: unique symbol;
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        required: boolean;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    name: StringConstructor;
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    filterable: {
        type: BooleanConstructor;
        default: boolean;
    };
    filterMethod: FunctionConstructor;
    remote: {
        type: BooleanConstructor;
        default: boolean;
    };
    remoteFunction: FunctionConstructor;
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    noMatchText: {
        type: StringConstructor;
        default: string;
    };
    noDataText: {
        type: StringConstructor;
        default: string;
    };
}, void, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        required: boolean;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    name: StringConstructor;
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    filterable: {
        type: BooleanConstructor;
        default: boolean;
    };
    filterMethod: FunctionConstructor;
    remote: {
        type: BooleanConstructor;
        default: boolean;
    };
    remoteFunction: FunctionConstructor;
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    noMatchText: {
        type: StringConstructor;
        default: string;
    };
    noDataText: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    multiple: boolean;
    disabled: boolean;
    clearable: boolean;
    placeholder: string;
    filterable: boolean;
    remote: boolean;
    loading: boolean;
    loadingText: string;
    noMatchText: string;
    noDataText: string;
}>;
export default _default;
