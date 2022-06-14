import { AllowedComponentProps } from 'vue';
import { App } from 'vue';
import { ComponentCustomProps } from 'vue';
import { ComponentOptionsMixin } from 'vue';
import { DefineComponent } from 'vue';
import { ExtractPropTypes } from 'vue';
import { Ref } from 'vue';
import { VNodeProps } from 'vue';

declare const _default: {
	prefix: string;
	install: (app: App<any>) => void;
};
export default _default;

export declare const Scroll: DefineComponent<
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
		wrap: Ref<HTMLElement | undefined>;
		main: Ref<HTMLElement | undefined>;
		barSlot: Ref<HTMLElement | undefined>;
		barThumb: Ref<HTMLElement | undefined>;
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

export {};
