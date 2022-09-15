import { computed, defineComponent, inject, renderSlot } from 'vue';
import { SelectItemProps } from './select-item-props';
import { ProvideSelectDisabled } from './select';

export default defineComponent({
	name: 'SelectItem',
	props: SelectItemProps,
	setup(props) {
		const injectSelectDisabled = inject<boolean>(ProvideSelectDisabled);

		const isDisabled = computed<boolean>(() => {
			return props.disabled || !!injectSelectDisabled;
		});

		const isSelected = computed<boolean>(() => {
			return false;
		});

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
