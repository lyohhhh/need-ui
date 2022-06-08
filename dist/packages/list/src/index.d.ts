import { PropType } from 'vue';
export interface Props {
    id: number;
    title: string;
    content: string;
    time: string;
    author: string;
    img?: string;
}
declare const _default: import("vue").DefineComponent<{
    list: {
        type: PropType<Props[]>;
        default: () => never[];
    };
}, {
    click: (...args: any[]) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    list: {
        type: PropType<Props[]>;
        default: () => never[];
    };
}>>, {
    list: Props[];
}>;
export default _default;
