declare const _default: import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
        default: string;
    };
    showCancel: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeOnModal: {
        type: BooleanConstructor;
        default: boolean;
    };
    top: {
        type: StringConstructor;
        default: string;
    };
    cancelLoading: {
        type: BooleanConstructor;
        default: boolean;
    };
    confirmLoading: {
        type: BooleanConstructor;
        default: boolean;
    };
    cancelDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    confirmDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    center: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    hideDialog: () => void;
    emitConfirm: () => void;
    emitCancel: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("confirm" | "cancel" | "update:modelValue")[], "confirm" | "cancel" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    showCancel: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeOnModal: {
        type: BooleanConstructor;
        default: boolean;
    };
    top: {
        type: StringConstructor;
        default: string;
    };
    cancelLoading: {
        type: BooleanConstructor;
        default: boolean;
    };
    confirmLoading: {
        type: BooleanConstructor;
        default: boolean;
    };
    cancelDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    confirmDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    center: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onConfirm?: ((...args: any[]) => any) | undefined;
    onCancel?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    title: string;
    showCancel: boolean;
    closeOnModal: boolean;
    top: string;
    cancelLoading: boolean;
    confirmLoading: boolean;
    cancelDisabled: boolean;
    confirmDisabled: boolean;
    modelValue: boolean;
    center: boolean;
}>;
export default _default;
