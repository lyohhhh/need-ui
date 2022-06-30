import mitt from 'mitt';
import { FormItem } from '.';

export type Events = {
	validate?: boolean;
	formItem: FormItem;
};

export const emitter = mitt<Events>();
