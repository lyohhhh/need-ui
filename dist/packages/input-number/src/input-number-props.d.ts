import { PropType } from 'vue';
export declare const InputNumberProps: {
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
        readonly type: PropType<"left" | "right" | "default">;
        readonly default: "default";
    };
    readonly name: StringConstructor;
    readonly label: StringConstructor;
    readonly placeholder: StringConstructor;
};
