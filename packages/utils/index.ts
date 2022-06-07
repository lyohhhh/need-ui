// 节流
export const throttle = function (fn: Function, delay = 100, immediate = true) {
	let timer: null | NodeJS.Timeout = null;
	return function (this: any, ...args: any[]) {
		if (!timer) {
			timer = setTimeout(() => {
				timer = null;
				!immediate && fn.apply(this, args);
			}, delay);
			immediate && fn.apply(this, args);
		}
	};
};

// 防抖
export const debounce = function (fn: Function, delay = 100, immediate = true) {
	let timer: null | NodeJS.Timeout = null;
	return function (this: any, ...args: any[]) {
		if (timer) clearTimeout(timer);
		immediate && !timer && fn.apply(this, args);
		timer = setTimeout(() => {
			timer = null;
			!immediate && fn.apply(this, args);
		}, delay);
	};
};
