import { PropType } from 'vue';

export const checkboxProps = {
	modelValue: {
		type: Boolean,
		// required: true,
	},
	value: {
		type: [] as PropType<string | number | boolean>,
	},
	label: {
		type: [] as PropType<string | number>,
	},
	border: {
		type: Boolean,
		default: false,
	},
	checked: {
		type: Boolean,
		default: false,
	},
	indeterminate: {
		type: Boolean,
		default: false,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
};
