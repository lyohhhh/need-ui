export declare const SelectProps: {
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
};
