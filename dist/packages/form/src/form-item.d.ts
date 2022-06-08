declare const FormItem: import("vue").DefineComponent<{
    prop: {
        type: StringConstructor;
    };
    label: {
        type: StringConstructor;
    };
    labelWidth: {
        type: StringConstructor;
    };
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    rules: {
        type: import("vue").PropType<{
            [key: string]: any;
        }>;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    prop: {
        type: StringConstructor;
    };
    label: {
        type: StringConstructor;
    };
    labelWidth: {
        type: StringConstructor;
    };
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    rules: {
        type: import("vue").PropType<{
            [key: string]: any;
        }>;
    };
}>>, {
    required: boolean;
}>;
export default FormItem;
