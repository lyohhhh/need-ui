import { AllowedComponentProps } from 'vue';
import { App } from 'vue';
import { ComponentCustomProps } from 'vue';
import { ComponentOptionsMixin } from 'vue';
import { ComputedRef } from 'vue';
import { DefineComponent } from 'vue';
import { EmitsOptions } from 'vue';
import { ExtractPropTypes } from 'vue';
import { PropType } from 'vue';
import { Ref } from 'vue';
import { Rules } from 'async-validator';
import { VNodeProps } from 'vue';

declare const _default: {
	prefix: string;
	install: (app: App<any>) => void;
};
export default _default;

export declare const LButton: DefineComponent<
	{
		size: {
			type: PropType<Size>;
			default: string;
		};
		type: {
			type: PropType<Type>;
			default: string;
		};
		plain: {
			type: BooleanConstructor;
			default: boolean;
		};
		round: {
			type: BooleanConstructor;
			default: boolean;
		};
		circle: {
			type: BooleanConstructor;
			default: boolean;
		};
		disabled: {
			type: BooleanConstructor;
			default: boolean;
		};
		loading: {
			type: BooleanConstructor;
			default: boolean;
		};
	},
	{
		buttonClass: ComputedRef<string>;
		emitClick: (...args: any[]) => void;
	},
	unknown,
	{},
	{},
	ComponentOptionsMixin,
	ComponentOptionsMixin,
	'click'[],
	'click',
	VNodeProps & AllowedComponentProps & ComponentCustomProps,
	Readonly<
		ExtractPropTypes<{
			size: {
				type: PropType<Size>;
				default: string;
			};
			type: {
				type: PropType<Type>;
				default: string;
			};
			plain: {
				type: BooleanConstructor;
				default: boolean;
			};
			round: {
				type: BooleanConstructor;
				default: boolean;
			};
			circle: {
				type: BooleanConstructor;
				default: boolean;
			};
			disabled: {
				type: BooleanConstructor;
				default: boolean;
			};
			loading: {
				type: BooleanConstructor;
				default: boolean;
			};
		}>
	> & {
		onClick?: ((...args: any[]) => any) | undefined;
	},
	{
		size: Size;
		type: Type;
		plain: boolean;
		round: boolean;
		circle: boolean;
		disabled: boolean;
		loading: boolean;
	}
>;

export declare const LDialog: DefineComponent<
	{
		title: {
			type: StringConstructor;
			default: string;
		};
		showCancel: {
			type: BooleanConstructor;
			default: boolean;
		};
		closeOnModal: {
			type: BooleanConstructor;
			default: boolean;
		};
		top: {
			type: StringConstructor;
			default: string;
		};
		cancelLoading: {
			type: BooleanConstructor;
			default: boolean;
		};
		confirmLoading: {
			type: BooleanConstructor;
			default: boolean;
		};
		cancelDisabled: {
			type: BooleanConstructor;
			default: boolean;
		};
		confirmDisabled: {
			type: BooleanConstructor;
			default: boolean;
		};
		modelValue: {
			type: BooleanConstructor;
			default: boolean;
		};
		center: {
			type: BooleanConstructor;
			default: boolean;
		};
	},
	{
		hideDialog: () => void;
		emitConfirm: () => void;
		emitCancel: () => void;
	},
	unknown,
	{},
	{},
	ComponentOptionsMixin,
	ComponentOptionsMixin,
	('confirm' | 'cancel' | 'update:modelValue')[],
	'confirm' | 'cancel' | 'update:modelValue',
	VNodeProps & AllowedComponentProps & ComponentCustomProps,
	Readonly<
		ExtractPropTypes<{
			title: {
				type: StringConstructor;
				default: string;
			};
			showCancel: {
				type: BooleanConstructor;
				default: boolean;
			};
			closeOnModal: {
				type: BooleanConstructor;
				default: boolean;
			};
			top: {
				type: StringConstructor;
				default: string;
			};
			cancelLoading: {
				type: BooleanConstructor;
				default: boolean;
			};
			confirmLoading: {
				type: BooleanConstructor;
				default: boolean;
			};
			cancelDisabled: {
				type: BooleanConstructor;
				default: boolean;
			};
			confirmDisabled: {
				type: BooleanConstructor;
				default: boolean;
			};
			modelValue: {
				type: BooleanConstructor;
				default: boolean;
			};
			center: {
				type: BooleanConstructor;
				default: boolean;
			};
		}>
	> & {
		onConfirm?: ((...args: any[]) => any) | undefined;
		onCancel?: ((...args: any[]) => any) | undefined;
		'onUpdate:modelValue'?: ((...args: any[]) => any) | undefined;
	},
	{
		title: string;
		showCancel: boolean;
		closeOnModal: boolean;
		top: string;
		cancelLoading: boolean;
		confirmLoading: boolean;
		cancelDisabled: boolean;
		confirmDisabled: boolean;
		modelValue: boolean;
		center: boolean;
	}
>;

export declare const LFooter: DefineComponent<
	{},
	{},
	{},
	{},
	{},
	ComponentOptionsMixin,
	ComponentOptionsMixin,
	EmitsOptions,
	string,
	VNodeProps & AllowedComponentProps & ComponentCustomProps,
	Readonly<ExtractPropTypes<{}>>,
	{}
>;

export declare const LForm: DefineComponent<
	{
		model: {
			type: PropType<{
				[key: string]: any;
			}>;
			required: boolean;
		};
		rules: {
			type: PropType<Rules>;
		};
		inline: {
			type: BooleanConstructor;
			default: boolean;
		};
		label: {
			type: PropType<'left' | 'right' | 'top'>;
			default: string;
		};
		labelWidth: {
			type: StringConstructor;
		};
		labelSuffix: {
			/**
			 * ????????? item ????????????
			 */
			type: StringConstructor;
		};
		disabled: {
			type: BooleanConstructor;
		};
	},
	() => JSX.Element,
	unknown,
	{},
	{},
	ComponentOptionsMixin,
	ComponentOptionsMixin,
	Record<string, any>,
	string,
	VNodeProps & AllowedComponentProps & ComponentCustomProps,
	Readonly<
		ExtractPropTypes<{
			model: {
				type: PropType<{
					[key: string]: any;
				}>;
				required: boolean;
			};
			rules: {
				type: PropType<Rules>;
			};
			inline: {
				type: BooleanConstructor;
				default: boolean;
			};
			label: {
				type: PropType<'left' | 'right' | 'top'>;
				default: string;
			};
			labelWidth: {
				type: StringConstructor;
			};
			labelSuffix: {
				/**
				 * ????????? item ????????????
				 */
				type: StringConstructor;
			};
			disabled: {
				type: BooleanConstructor;
			};
		}>
	>,
	{
		inline: boolean;
		label: 'left' | 'right' | 'top';
		disabled: boolean;
	}
>;

export declare const LFormItem: DefineComponent<
	{
		prop: {
			type: StringConstructor;
		};
		label: {
			type: StringConstructor;
		};
		labelWidth: {
			type: StringConstructor;
		};
		required: {
			type: BooleanConstructor;
			default: boolean;
		};
		rules: {
			type: PropType<{
				[key: string]: any;
			}>;
		};
	},
	() => JSX.Element,
	unknown,
	{},
	{},
	ComponentOptionsMixin,
	ComponentOptionsMixin,
	Record<string, any>,
	string,
	VNodeProps & AllowedComponentProps & ComponentCustomProps,
	Readonly<
		ExtractPropTypes<{
			prop: {
				type: StringConstructor;
			};
			label: {
				type: StringConstructor;
			};
			labelWidth: {
				type: StringConstructor;
			};
			required: {
				type: BooleanConstructor;
				default: boolean;
			};
			rules: {
				type: PropType<{
					[key: string]: any;
				}>;
			};
		}>
	>,
	{
		required: boolean;
	}
>;

export declare const LIcon: DefineComponent<
	{
		icon: {
			type: StringConstructor;
			required: true;
		};
		styles: {
			type: StringConstructor;
			required: false;
		};
	},
	() => JSX.Element,
	unknown,
	{},
	{},
	ComponentOptionsMixin,
	ComponentOptionsMixin,
	'click'[],
	'click',
	VNodeProps & AllowedComponentProps & ComponentCustomProps,
	Readonly<
		ExtractPropTypes<{
			icon: {
				type: StringConstructor;
				required: true;
			};
			styles: {
				type: StringConstructor;
				required: false;
			};
		}>
	> & {
		onClick?: ((...args: any[]) => any) | undefined;
	},
	{}
>;

export declare const LInput: DefineComponent<
	{
		placeholder: {
			type: StringConstructor;
			default: string;
		};
		clearable: {
			type: BooleanConstructor;
			default: boolean;
		};
		disabled: {
			type: BooleanConstructor;
			default: boolean;
		};
		value: {
			type: StringConstructor;
			default: string;
		};
		type: {
			type: StringConstructor;
			default: string;
		};
		error: {
			type: BooleanConstructor;
			default: boolean;
		};
		errorPlaceholder: {
			type: StringConstructor;
			default: string;
		};
		prefixIcon: StringConstructor;
		suffixIcon: StringConstructor;
		modelValue: {
			type: (StringConstructor | NumberConstructor)[];
			required: boolean;
		};
	},
	() => JSX.Element,
	unknown,
	{},
	{},
	ComponentOptionsMixin,
	ComponentOptionsMixin,
	'update:modelValue'[],
	'update:modelValue',
	VNodeProps & AllowedComponentProps & ComponentCustomProps,
	Readonly<
		ExtractPropTypes<{
			placeholder: {
				type: StringConstructor;
				default: string;
			};
			clearable: {
				type: BooleanConstructor;
				default: boolean;
			};
			disabled: {
				type: BooleanConstructor;
				default: boolean;
			};
			value: {
				type: StringConstructor;
				default: string;
			};
			type: {
				type: StringConstructor;
				default: string;
			};
			error: {
				type: BooleanConstructor;
				default: boolean;
			};
			errorPlaceholder: {
				type: StringConstructor;
				default: string;
			};
			prefixIcon: StringConstructor;
			suffixIcon: StringConstructor;
			modelValue: {
				type: (StringConstructor | NumberConstructor)[];
				required: boolean;
			};
		}>
	> & {
		'onUpdate:modelValue'?: ((...args: any[]) => any) | undefined;
	},
	{
		placeholder: string;
		clearable: boolean;
		disabled: boolean;
		value: string;
		type: string;
		error: boolean;
		errorPlaceholder: string;
	}
>;

export declare const LLink: DefineComponent<
	{
		type: {
			type: PropType<Type>;
			default: string;
		};
		underline: {
			type: BooleanConstructor;
			default: boolean;
		};
		disabled: {
			type: BooleanConstructor;
			default: boolean;
		};
		href: StringConstructor;
		icon: StringConstructor;
	},
	() => JSX.Element,
	unknown,
	{},
	{},
	ComponentOptionsMixin,
	ComponentOptionsMixin,
	Record<string, any>,
	string,
	VNodeProps & AllowedComponentProps & ComponentCustomProps,
	Readonly<
		ExtractPropTypes<{
			type: {
				type: PropType<Type>;
				default: string;
			};
			underline: {
				type: BooleanConstructor;
				default: boolean;
			};
			disabled: {
				type: BooleanConstructor;
				default: boolean;
			};
			href: StringConstructor;
			icon: StringConstructor;
		}>
	>,
	{
		type: Type;
		underline: boolean;
		disabled: boolean;
	}
>;

export declare const LList: DefineComponent<
	{
		list: {
			type: PropType<Props[]>;
			default: () => never[];
		};
	},
	{
		click: (...args: any[]) => void;
	},
	unknown,
	{},
	{},
	ComponentOptionsMixin,
	ComponentOptionsMixin,
	Record<string, any>,
	string,
	VNodeProps & AllowedComponentProps & ComponentCustomProps,
	Readonly<
		ExtractPropTypes<{
			list: {
				type: PropType<Props[]>;
				default: () => never[];
			};
		}>
	>,
	{
		list: Props[];
	}
>;

export declare const LLoading: DefineComponent<
	{
		readonly loading: BooleanConstructor;
		readonly finished: BooleanConstructor;
		readonly finishedText: {
			readonly type: StringConstructor;
			readonly default: '???????????????~';
		};
		readonly loadingText: {
			readonly type: StringConstructor;
			readonly default: '???????????????...';
		};
		readonly onLoad: FunctionConstructor;
	},
	{
		obs: Ref<HTMLElement | undefined>;
	},
	unknown,
	{},
	{},
	ComponentOptionsMixin,
	ComponentOptionsMixin,
	Record<string, any>,
	string,
	VNodeProps & AllowedComponentProps & ComponentCustomProps,
	Readonly<
		ExtractPropTypes<{
			readonly loading: BooleanConstructor;
			readonly finished: BooleanConstructor;
			readonly finishedText: {
				readonly type: StringConstructor;
				readonly default: '???????????????~';
			};
			readonly loadingText: {
				readonly type: StringConstructor;
				readonly default: '???????????????...';
			};
			readonly onLoad: FunctionConstructor;
		}>
	>,
	{
		readonly loading: boolean;
		readonly finished: boolean;
		readonly finishedText: string;
		readonly loadingText: string;
	}
>;

export declare const LMasker: DefineComponent<
	{
		show: {
			type: PropType<boolean>;
		};
		lock: {
			type: PropType<boolean>;
			default: boolean;
		};
	},
	{
		hiddenMask: () => void;
		touchHandle: (e: Event) => false | undefined;
	},
	unknown,
	{},
	{},
	ComponentOptionsMixin,
	ComponentOptionsMixin,
	'change'[],
	'change',
	VNodeProps & AllowedComponentProps & ComponentCustomProps,
	Readonly<
		ExtractPropTypes<{
			show: {
				type: PropType<boolean>;
			};
			lock: {
				type: PropType<boolean>;
				default: boolean;
			};
		}>
	> & {
		onChange?: ((...args: any[]) => any) | undefined;
	},
	{
		lock: boolean;
	}
>;

export declare const LScroll: DefineComponent<
	{
		height: {
			type: StringConstructor;
			default: string;
		};
		slotColor: {
			type: StringConstructor;
			default: string;
		};
		class: {
			type: StringConstructor;
			default: string;
		};
	},
	{
		scrollEvent: (this: any, ...args: any[]) => void;
		scrollToBySlot: (e: MouseEvent) => void;
		setMoveStatus: (move: boolean) => void;
		moveByMouse: (this: any, ...args: any[]) => void;
		setStartY: (e: MouseEvent) => void;
		isMove: Ref<boolean>;
		wrap?: Ref<any> | undefined;
		main?: Ref<any> | undefined;
		barSlot?: Ref<any> | undefined;
		barThumb?: Ref<any> | undefined;
		wrapHeight: Ref<number>;
		mainHeight: Ref<number>;
		barThumbHeight: Ref<string>;
		scrollY: Ref<string>;
		maxScrollY: Ref<number>;
		startY: Ref<number>;
	},
	unknown,
	{},
	{},
	ComponentOptionsMixin,
	ComponentOptionsMixin,
	Record<string, any>,
	string,
	VNodeProps & AllowedComponentProps & ComponentCustomProps,
	Readonly<
		ExtractPropTypes<{
			height: {
				type: StringConstructor;
				default: string;
			};
			slotColor: {
				type: StringConstructor;
				default: string;
			};
			class: {
				type: StringConstructor;
				default: string;
			};
		}>
	>,
	{
		height: string;
		slotColor: string;
		class: string;
	}
>;

export declare const LSkeleton: DefineComponent<
	{
		rows: {
			type: PropType<number>;
			default: number;
		};
		rowWidth: {
			type: PropType<string | number | (string | number)[]>;
			default: string;
		};
		items: {
			type: PropType<number>;
			default: number;
		};
		title: {
			type: BooleanConstructor;
			default: boolean;
		};
		image: {
			type: BooleanConstructor;
			default: boolean;
		};
		loading: {
			type: BooleanConstructor;
			default: boolean;
		};
		time: {
			type: BooleanConstructor;
			default: boolean;
		};
	},
	unknown,
	unknown,
	{},
	{},
	ComponentOptionsMixin,
	ComponentOptionsMixin,
	Record<string, any>,
	string,
	VNodeProps & AllowedComponentProps & ComponentCustomProps,
	Readonly<
		ExtractPropTypes<{
			rows: {
				type: PropType<number>;
				default: number;
			};
			rowWidth: {
				type: PropType<string | number | (string | number)[]>;
				default: string;
			};
			items: {
				type: PropType<number>;
				default: number;
			};
			title: {
				type: BooleanConstructor;
				default: boolean;
			};
			image: {
				type: BooleanConstructor;
				default: boolean;
			};
			loading: {
				type: BooleanConstructor;
				default: boolean;
			};
			time: {
				type: BooleanConstructor;
				default: boolean;
			};
		}>
	>,
	{
		rows: number;
		rowWidth: string | number | (string | number)[];
		items: number;
		title: boolean;
		image: boolean;
		loading: boolean;
		time: boolean;
	}
>;

declare interface Props {
	id: number;
	title: string;
	content: string;
	time: string;
	author: string;
	img?: string;
}

declare type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

declare type Type = 'success' | 'default' | 'warning' | 'primary' | 'danger';

export {};
