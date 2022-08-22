import { defineComponent, renderSlot } from 'vue';
import { SelectProps } from './select.props';

export default defineComponent({
	name: 'Select',
	props: SelectProps,
	setup(_props) {},
	render() {
		const slots = this.$slots;
		return (
			<div class='l-select'>
				<div class='l-select__inner'>{renderSlot(slots, 'default')}</div>
			</div>
		);
	},
});
