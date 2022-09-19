import { defineComponent, renderSlot } from 'vue';
import { SelectProps } from './select.props';

// 全局 disabled
export const ProvideSelectDisabled = Symbol('select-disabled');

export default defineComponent({
	name: 'Select',
	props: SelectProps,
	setup(_props) {},
	render() {
		// 设置插槽
		const slots = this.$slots;
		return (
			<div class='l-select'>
				<div class='l-select__inner'>{renderSlot(slots, 'default')}</div>
			</div>
		);
	},
});
