import { defineComponent, provide, ref, renderSlot, watch } from 'vue';
import { groupProps } from './radio-group-props';

export const ProvideRadioKey = Symbol('radio');

export default defineComponent({
	name: 'LRadioGroup',
	props: groupProps,
	emits: ['update:modelValue'],
	setup(props, { emit, slots }) {
		const value = ref<string | number>(props.modelValue as string | number);

		provide(ProvideRadioKey, value);

		watch(value, val => {
			emit('update:modelValue', val);
		});

		return () => (
			<>
				<div class='l-radio__wrapper'>{renderSlot(slots, 'default')}</div>
			</>
		);
	},
});
