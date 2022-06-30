import { Rules, Values } from 'async-validator';
import { InjectionKey } from 'vue';

export default () => {};

export type Type = 'success' | 'default' | 'warning' | 'primary' | 'danger';

export type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

// 定义效验方法
export type Validate = (valid: boolean) => void;

export type FormType = {
	validate: (cb: (isValid: boolean) => void) => void;
};
// 定义 Item 抛出的方法
export type FormItem = {
	validate: () => Promise<Values>;
};

// 双向当定的类型
export type FormProp = {
	model: Record<string, unknown>;
	rules?: Rules;
};

// 定义 Symbol key
export const key: InjectionKey<FormProp> = Symbol('formProp');
