import { PropType } from 'vue';
export declare type ListType = (string | number)[];
export declare const checkboxGroupProps: {
    modelValue: {
        type: PropType<ListType>;
    };
    value: PropType<ListType>;
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    min: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
};
