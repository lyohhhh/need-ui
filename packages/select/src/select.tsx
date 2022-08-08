import { defineComponent } from 'vue';
import { SelectProps } from './select.props';

export default defineComponent({
	name: 'Select',
	props: SelectProps,
	setup(_props) {},
	render() {
		return <div>select</div>;
	},
});
