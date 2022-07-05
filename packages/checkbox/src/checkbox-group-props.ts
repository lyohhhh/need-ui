import { PropType } from 'vue';

export const checkboxGroupProps = {
	modelValue: {
		type: [] as PropType<Array<string | number>>,
		required: true,
	},
	value: [] as PropType<Array<string | number>>,
	disabled: {
		type: Boolean,
		default: false,
	},
	border: {
		type: Boolean,
		default: false,
	},
	min: Number,
	max: Number,
};
