// auto register component types
declare module 'vue' {
	export interface GlobalComponents {
		LButton: typeof import('need-ui')['LButton'];
		LDialog: typeof import('need-ui')['LDialog'];
		LFooter: typeof import('need-ui')['LFooter'];
		LForm: typeof import('need-ui')['LForm'];
		LFormItem: typeof import('need-ui')['LFormItem'];
		LIcon: typeof import('need-ui')['LIcon'];
		LInput: typeof import('need-ui')['LInput'];
		LList: typeof import('need-ui')['LList'];
		LLoading: typeof import('need-ui')['LLoading'];
		LMasker: typeof import('need-ui')['LMasker'];
		LSkeleton: typeof import('need-ui')['LSkeleton'];
		LScroll: typeof import('need-ui')['LScroll'];
		LLink: typeof import('need-ui')['LLink'];
		[key: string]: any;
	}
}
export {};
