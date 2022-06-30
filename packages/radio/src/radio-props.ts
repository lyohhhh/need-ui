export const radioProps = {
	disabled: {
		type: Boolean,
		default: false,
	},
	modelValue: {
		type: [String, Number],
		required: true,
	},
	name: String,
	border: Boolean,
	label: {
		type: [String, Number],
		required: true,
	},
};
