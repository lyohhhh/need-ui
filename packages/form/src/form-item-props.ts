import { PropType } from 'vue';

export default {
	prop: {
		type: String,
	},
	label: {
		type: String,
	},
	labelWidth: {
		type: String,
	},
	required: {
		type: Boolean,
		default: false,
	},
	rules: {
		type: Object as PropType<{ [key: string]: any }>,
	},
};
