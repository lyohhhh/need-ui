import { FormItem } from '.';
export declare type Events = {
    validate?: boolean;
    formItem: FormItem;
};
export declare const emitter: import("mitt").Emitter<Events>;
