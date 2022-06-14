import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    size: {
        type: PropType<"base" | "xs" | "sm" | "lg" | "xl">;
        default: string;
    };
    type: {
        type: PropType<"default" | "success" | "warning" | "primary" | "danger">;
        default: string;
    };
    plain: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    circle: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    buttonClass: import("vue").ComputedRef<string>;
    emitClick: (...args: any[]) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "click"[], "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    size: {
        type: PropType<"base" | "xs" | "sm" | "lg" | "xl">;
        default: string;
    };
    type: {
        type: PropType<"default" | "success" | "warning" | "primary" | "danger">;
        default: string;
    };
    plain: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    circle: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
}, {
    size: "base" | "xs" | "sm" | "lg" | "xl";
    type: "default" | "success" | "warning" | "primary" | "danger";
    plain: boolean;
    round: boolean;
    circle: boolean;
    disabled: boolean;
    loading: boolean;
}>;
export default _default;
