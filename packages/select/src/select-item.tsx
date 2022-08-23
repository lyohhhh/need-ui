import { defineComponent } from 'vue';
import { SelectItemProps } from './select-item-props';

export default defineComponent({
	name: 'SelectItem',
	props: SelectItemProps,
	setup(_props) {},
	render() {
		return <div class='l-select-item'></div>;
	},
});
