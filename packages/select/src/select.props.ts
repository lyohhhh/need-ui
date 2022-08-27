export const SelectProps = {
	modelValue: {
		type: [String, Number],
		required: true,
	},
	multiple: {
		type: Boolean,
		default: false,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	clearable: {
		type: Boolean,
		default: false,
	},
	name: String,
	placeholder: {
		type: String,
		default: '请选择',
	},
	filterable: {
		type: Boolean,
		default: false,
	},
	filterMethod: Function,
	remote: {
		type: Boolean,
		default: false,
	},
	remoteFunction: Function,
	loading: {
		type: Boolean,
		default: false,
	},
	loadingText: {
		type: String,
		default: '加载中',
	},
	noMatchText: {
		type: String,
		default: '暂无匹配数据',
	},
	noDataText: {
		type: String,
		default: '暂无数据',
	},
};
