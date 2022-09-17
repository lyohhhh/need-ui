import { computed, defineComponent, inject, renderSlot } from 'vue';
import { SelectItemProps } from './select-item-props';
import { ProvideSelectDisabled } from './select';

export default defineComponent({
	name: 'SelectItem',
	props: SelectItemProps,
	setup(props) {
		// 父组件 disabled
		const injectSelectDisabled = inject<boolean>(ProvideSelectDisabled);

		// 判断是否禁用
		const isDisabled = computed<boolean>(() => {
			return props.disabled || !!injectSelectDisabled;
		});

		// 判断是否选中
		const isSelected = computed<boolean>(() => {
			return false;
		});

		// 获取 样式
		const classes = computed<string>(() => {
			let classStr: string[] = [];
			if (isDisabled.value) classStr.push('is-disabled');
			if (isSelected.value) classStr.push('is-selected');
			return classStr.join(' ');
		});

		return {
			classes,
		};
	},
	render() {
		return (
			<li class={['l-select-item', this.classes]}>
				<span class='l-select-item__inner'>{renderSlot(this.$slots, 'default')}</span>
			</li>
		);
	},
});
