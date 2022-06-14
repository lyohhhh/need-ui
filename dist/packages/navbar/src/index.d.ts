import { PropType } from 'vue';
interface Tree {
    id: string;
    name: string;
    url: null | string;
    children?: Tree[];
}
declare const Navbar: import("vue").DefineComponent<{
    category: {
        type: PropType<Tree[]>;
        required: true;
    };
}, {
    slideShow: (i: number) => void;
    slideHide: (i: number) => void;
    slideBooleanList: boolean[];
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    category: {
        type: PropType<Tree[]>;
        required: true;
    };
}>>, {}>;
export default Navbar;
