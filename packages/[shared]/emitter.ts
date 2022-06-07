import mitt from 'mitt';
import { FormItem } from '@/form/src/shared';

export type Events = {
	validate?: boolean;
	formItem: FormItem;
};

export const emitter = mitt<Events>();
