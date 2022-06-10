declare type Element = {
    size?: string;
    zIndex?: number;
};
/**
 * @description 获取全局设置的配置
 * @returns { Element | null } 全局设置的配置项
 */
declare const useGlobalConfig: () => Element;
export { useGlobalConfig };
