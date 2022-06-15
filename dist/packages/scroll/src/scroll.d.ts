declare const _default: import("vue").DefineComponent<{
    height: {
        type: StringConstructor;
        default: string;
    };
    slotColor: {
        type: StringConstructor;
        default: string;
    };
    class: {
        type: StringConstructor;
        default: string;
    };
}, {
    scrollEvent: (this: any, ...args: any[]) => void;
    scrollToBySlot: (e: MouseEvent) => void;
    setMoveStatus: (move: boolean) => void;
    moveByMouse: (this: any, ...args: any[]) => void;
    setStartY: (e: MouseEvent) => void;
    isMove: import("vue").Ref<boolean>;
    barThumbHeight: string;
    scrollY: string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    height: {
        type: StringConstructor;
        default: string;
    };
    slotColor: {
        type: StringConstructor;
        default: string;
    };
    class: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    height: string;
    slotColor: string;
    class: string;
}>;
export default _default;
