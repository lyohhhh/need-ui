declare const Form: import("vue").DefineComponent<{
    model: {
        type: import("vue").PropType<{
            [key: string]: any;
        }>;
        required: boolean;
    };
    rules: {
        type: import("vue").PropType<import("async-validator").Rules>;
    };
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
    label: {
        type: import("vue").PropType<"left" | "right" | "top">;
        default: string;
    };
    labelWidth: {
        type: StringConstructor;
    };
    labelSuffix: {
        /**
         * 对每个 item 进行效验
         */
        type: StringConstructor;
    };
    disabled: {
        type: BooleanConstructor;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    model: {
        type: import("vue").PropType<{
            [key: string]: any;
        }>;
        required: boolean;
    };
    rules: {
        type: import("vue").PropType<import("async-validator").Rules>;
    };
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
    label: {
        type: import("vue").PropType<"left" | "right" | "top">;
        default: string;
    };
    labelWidth: {
        type: StringConstructor;
    };
    labelSuffix: {
        /**
         * 对每个 item 进行效验
         */
        type: StringConstructor;
    };
    disabled: {
        type: BooleanConstructor;
    };
}>>, {
    inline: boolean;
    label: "left" | "right" | "top";
    disabled: boolean;
}>;
export default Form;
