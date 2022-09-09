import { PropType } from 'vue';
export declare const checkboxProps: {
    modelValue: {
        type: BooleanConstructor;
    };
    value: {
        type: PropType<string | number | boolean>;
    };
    label: {
        type: PropType<string | number>;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    checked: {
        type: BooleanConstructor;
        default: boolean;
    };
    indeterminate: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
};
