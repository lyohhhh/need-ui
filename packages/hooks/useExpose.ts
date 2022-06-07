import { getCurrentInstance } from 'vue';

export function useExpose(api: Record<string, any>) {
	const instance = getCurrentInstance();
	if (instance) {
		Object.assign(instance.proxy, api);
	}
}
