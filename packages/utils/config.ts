import { getCurrentInstance, ComponentInternalInstance } from 'vue';
type Element = {
	size?: string;
	zIndex?: number;
};

/**
 * @description 获取全局设置的配置
 * @returns { Element | null } 全局设置的配置项
 */
const useGlobalConfig = function (): Element {
	const instance: null | ComponentInternalInstance = getCurrentInstance();
	if (!instance) {
		console.log('未设置配置项');
	}
	return instance?.appContext.config.globalProperties.$Element || {};
};

export { useGlobalConfig };
