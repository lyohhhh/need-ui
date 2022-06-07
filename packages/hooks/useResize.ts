import { ref } from 'vue';
import { throttle } from '@/utils';

const MOBILE = 480;

export const useResize = () => {
	const isMobile = ref<boolean>(isMobileHandle());
	window.addEventListener(
		'resize',
		throttle(() => {
			isMobile.value = isMobileHandle();
		})
	);
	return isMobile;
};

export const resizeHandle = (): number => {
	return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
};

export const isMobileHandle = (): boolean => {
	const windowWidth = resizeHandle();
	return windowWidth < MOBILE;
};
