declare const _default: import("vue").DefineComponent<{
    loading: BooleanConstructor;
    finished: BooleanConstructor;
    finishedText: {
        type: StringConstructor;
        default: string;
    };
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    onLoad: FunctionConstructor;
}, {
    obs: import("vue").Ref<HTMLElement | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    loading: BooleanConstructor;
    finished: BooleanConstructor;
    finishedText: {
        type: StringConstructor;
        default: string;
    };
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    onLoad: FunctionConstructor;
}>>, {
    loading: boolean;
    finished: boolean;
    finishedText: string;
    loadingText: string;
}>;
export default _default;
