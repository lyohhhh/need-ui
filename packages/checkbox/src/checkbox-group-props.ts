import { PropType } from 'vue';
export type ListType = (string | number)[];
export const checkboxGroupProps = {
	modelValue: {
		type: [] as PropType<ListType>,
		required: true,
	},
	value: [] as PropType<ListType>,
	disabled: {
		type: Boolean,
		default: false,
	},
	border: {
		type: Boolean,
		default: false,
	},
	min: {
		type: Number,
		default: -Infinity,
	},
	max: {
		type: Number,
		default: Infinity,
	},
};
