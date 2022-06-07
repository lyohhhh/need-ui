interface Load {
	root: HTMLElement | null;
	obs: HTMLElement;
	load: () => void;
}

export class ScrollObserver<T extends Load> {
	private observer: IntersectionObserver | undefined;
	public readonly opt: Load;
	constructor(opt: T) {
		this.opt = opt;
		this.init();
	}

	init() {
		this.observer = new IntersectionObserver(this.callback.bind(this), {
			root: this.opt.root,
			rootMargin: '0px 0px -140px 0px ',
		});
		this.handleObserver();
	}

	callback(entries: IntersectionObserverEntry[]) {
		// isIntersecting true -> 出现
		//                false -> 隐藏
		if (entries[0].isIntersecting) {
			this.opt.load();
		}
	}

	handleObserver() {
		this.observer?.observe(this.opt.obs);
	}

	cancelObserver() {
		this.observer?.unobserve(this.opt.obs);
	}
}
