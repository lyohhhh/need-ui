import { PropType } from 'vue';
import '../styles/button.scss';
import type { Type, Size } from '@/[shared]';
declare const _default: import("vue").DefineComponent<{
    size: {
        type: PropType<Size>;
        default: string;
    };
    type: {
        type: PropType<Type>;
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
        type: PropType<Size>;
        default: string;
    };
    type: {
        type: PropType<Type>;
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
    size: Size;
    type: Type;
    plain: boolean;
    round: boolean;
    circle: boolean;
    disabled: boolean;
    loading: boolean;
}>;
export default _default;
