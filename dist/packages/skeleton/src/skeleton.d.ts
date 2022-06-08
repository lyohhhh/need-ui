import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    rows: {
        type: PropType<number>;
        default: number;
    };
    rowWidth: {
        type: PropType<string | number | (string | number)[]>;
        default: string;
    };
    items: {
        type: PropType<number>;
        default: number;
    };
    title: {
        type: BooleanConstructor;
        default: boolean;
    };
    image: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    time: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    rows: {
        type: PropType<number>;
        default: number;
    };
    rowWidth: {
        type: PropType<string | number | (string | number)[]>;
        default: string;
    };
    items: {
        type: PropType<number>;
        default: number;
    };
    title: {
        type: BooleanConstructor;
        default: boolean;
    };
    image: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    time: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    rows: number;
    rowWidth: string | number | (string | number)[];
    items: number;
    title: boolean;
    image: boolean;
    loading: boolean;
    time: boolean;
}>;
export default _default;
