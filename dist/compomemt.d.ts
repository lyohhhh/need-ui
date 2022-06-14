declare module 'vue' {
	export interface GlobalComponents {
		RAside: typeof import('need-ui')['RAside'];
		Button: typeof import('need-ui')['Button'];
		Dialog: typeof import('need-ui')['Dialog'];
		IconFont: typeof import('need-ui')['IconFont'];
		List: typeof import('need-ui')['List'];
		LoadingMore: typeof import('need-ui')['LoadingMore'];
		Masker: typeof import('need-ui')['Masker'];
		Navbar: typeof import('need-ui')['Navbar'];
		Sidebar: typeof import('need-ui')['Sidebar'];
		Skeleton: typeof import('need-ui')['Skeleton'];
		Input: typeof import('need-ui')['Input'];
		Form: typeof import('need-ui')['Form'];
		FormItem: typeof import('need-ui')['FormItem'];
		Footer: typeof import('need-ui')['Footer'];
		Scroll: typeof import('need-ui')['Scroll'];
		[key: string]: any;
	}
}

export {};
