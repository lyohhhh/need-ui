import { defineComponent } from 'vue';
import { InputNumberProps } from './input-number-props';

export default defineComponent({
	name: 'InputNumber',
	props: InputNumberProps,
	emits: ['update:modelValue', 'focus', 'blur', 'change'],
	setup() {
		return () => 1;
	},
});
