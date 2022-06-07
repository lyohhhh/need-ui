export default {
	loading: Boolean,
	finished: Boolean,
	finishedText: {
		type: String,
		default: '没有更多了~',
	},
	loadingText: {
		type: String,
		default: '正在加载中...',
	},
	onLoad: Function,
} as const;
