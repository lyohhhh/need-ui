import { Rules } from 'async-validator';
import { PropType } from 'vue';
declare const _default: {
    model: {
        type: PropType<{
            [key: string]: any;
        }>;
        required: boolean;
    };
    rules: {
        type: PropType<Rules>;
    };
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
    label: {
        type: PropType<"top" | "left" | "right">;
        default: string;
    };
    labelWidth: {
        type: StringConstructor;
    };
    labelSuffix: {
        type: StringConstructor;
    };
    disabled: {
        type: BooleanConstructor;
    };
};
export default _default;
