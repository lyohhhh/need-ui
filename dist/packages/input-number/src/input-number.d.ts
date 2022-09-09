import '../styles/input-number.scss';
declare const _default: import("vue").DefineComponent<{
    readonly modelValue: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly min: {
        readonly type: NumberConstructor;
        readonly default: number;
    };
    readonly max: {
        readonly type: NumberConstructor;
        readonly default: number;
    };
    readonly step: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly stepStrictly: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly precision: NumberConstructor;
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly controls: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly controlsPosition: {
        readonly type: import("vue").PropType<"left" | "right" | "default">;
        readonly default: "default";
    };
    readonly name: StringConstructor;
    readonly label: StringConstructor;
    readonly placeholder: StringConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "focus" | "blur" | "change")[], "update:modelValue" | "focus" | "blur" | "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly modelValue: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly min: {
        readonly type: NumberConstructor;
        readonly default: number;
    };
    readonly max: {
        readonly type: NumberConstructor;
        readonly default: number;
    };
    readonly step: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly stepStrictly: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly precision: NumberConstructor;
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly controls: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly controlsPosition: {
        readonly type: import("vue").PropType<"left" | "right" | "default">;
        readonly default: "default";
    };
    readonly name: StringConstructor;
    readonly label: StringConstructor;
    readonly placeholder: StringConstructor;
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onFocus?: ((...args: any[]) => any) | undefined;
    onBlur?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    readonly modelValue: number;
    readonly min: number;
    readonly max: number;
    readonly step: number;
    readonly stepStrictly: boolean;
    readonly disabled: boolean;
    readonly controls: boolean;
    readonly controlsPosition: "left" | "right" | "default";
}>;
export default _default;
