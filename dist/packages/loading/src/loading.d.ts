declare const _default: import("vue").DefineComponent<{
    readonly loading: BooleanConstructor;
    readonly finished: BooleanConstructor;
    readonly finishedText: {
        readonly type: StringConstructor;
        readonly default: "没有更多了~";
    };
    readonly loadingText: {
        readonly type: StringConstructor;
        readonly default: "正在加载中...";
    };
    readonly onLoad: FunctionConstructor;
}, {
    obs: import("vue").Ref<HTMLElement | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly loading: BooleanConstructor;
    readonly finished: BooleanConstructor;
    readonly finishedText: {
        readonly type: StringConstructor;
        readonly default: "没有更多了~";
    };
    readonly loadingText: {
        readonly type: StringConstructor;
        readonly default: "正在加载中...";
    };
    readonly onLoad: FunctionConstructor;
}>>, {
    readonly loading: boolean;
    readonly finished: boolean;
    readonly finishedText: string;
    readonly loadingText: string;
}>;
export default _default;
