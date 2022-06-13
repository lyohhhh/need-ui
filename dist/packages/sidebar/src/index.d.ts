import { PropType } from 'vue';
interface Tree {
    id: string;
    name: string;
    url: null | string;
    children?: Tree[];
}
declare const Sidebar: import("vue").DefineComponent<{
    category: {
        type: PropType<Tree[]>;
        required: true;
    };
    modelValue: {
        type: PropType<boolean>;
    };
}, {
    changeCollapse: (flag: boolean) => void;
    activedIndex: import("vue").Ref<number>;
    collapseSideByIndex: (index: number) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    category: {
        type: PropType<Tree[]>;
        required: true;
    };
    modelValue: {
        type: PropType<boolean>;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {}>;
export default Sidebar;
