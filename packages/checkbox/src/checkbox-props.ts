import { PropType } from 'vue';

export const checkboxProps = {
	modelValue: {
		type: Boolean,
		required: true,
	},
	value: {
		type: [] as PropType<string | number | boolean>,
	},
	label: {
		type: [String, Number],
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
