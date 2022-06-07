import * as Components from '@/components';

declare module 'vue' {
	export interface GlobalComponents {
		RAside: typeof Components['RAside'];
		Button: typeof Components['Button'];
		Dialog: typeof Components['Dialog'];
		IconFont: typeof Components['IconFont'];
		List: typeof Components['List'];
		LoadingMore: typeof Components['LoadingMore'];
		Masker: typeof Components['Masker'];
		Navbar: typeof Components['Navbar'];
		Sidebar: typeof Components['Sidebar'];
		Skeleton: typeof Components['Skeleton'];
		Input: typeof Components['Input'];
		Form: typeof Components['Form'];
		FormItem: typeof Components['FormItem'];
		Footer: typeof Components['Footer'];
		Scroll: typeof Components['Scroll'];
		[key: string]: any;
	}
}

export {};
