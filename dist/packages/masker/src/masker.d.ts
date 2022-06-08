import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    show: {
        type: PropType<boolean>;
    };
    lock: {
        type: PropType<boolean>;
        default: boolean;
    };
}, {
    hiddenMask: () => void;
    touchHandle: (e: Event) => false | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    show: {
        type: PropType<boolean>;
    };
    lock: {
        type: PropType<boolean>;
        default: boolean;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    lock: boolean;
}>;
export default _default;
