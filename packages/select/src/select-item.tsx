import { computed, defineComponent, renderSlot } from 'vue';
import { SelectItemProps } from './select-item-props';

export default defineComponent({
	name: 'SelectItem',
	props: SelectItemProps,
	setup(_props) {
		const classes = computed<string>(() => {
			let classStr: string[] = [];
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
