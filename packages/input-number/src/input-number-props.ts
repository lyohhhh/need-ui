import { PropType } from 'vue';

export const InputNumberProps = {
	modelValue: {
		type: Number,
		default: 0,
	},
	min: {
		type: Number,
		default: -Infinity,
	},
	max: {
		type: Number,
		default: Infinity,
	},
	step: {
		type: Number,
		default: 1,
	},
	stepStrictly: {
		type: Boolean,
		default: false,
	},
	precision: Number,
	disabled: {
		type: Boolean,
		default: false,
	},
	controls: {
		type: Boolean,
		default: false,
	},
	controlsPosition: {
		type: String as PropType<'left' | 'right' | 'default'>,
		default: 'default',
	},
	name: String,
	label: String,
	placeholder: String,
};
