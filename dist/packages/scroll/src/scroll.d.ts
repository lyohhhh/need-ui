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
    wrap?: import("vue").Ref<any> | undefined;
    main?: import("vue").Ref<any> | undefined;
    barSlot?: import("vue").Ref<any> | undefined;
    barThumb?: import("vue").Ref<any> | undefined;
    wrapHeight: import("vue").Ref<number>;
    mainHeight: import("vue").Ref<number>;
    barThumbHeight: import("vue").Ref<string>;
    scrollY: import("vue").Ref<string>;
    maxScrollY: import("vue").Ref<number>;
    startY: import("vue").Ref<number>;
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
