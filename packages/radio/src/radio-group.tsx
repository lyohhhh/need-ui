import { defineComponent, provide, ref, renderSlot, watch } from 'vue';
import { groupProps } from './radio-group-props';

export const ProvideRadioKey = Symbol('radio');

/***
 * TODO: radio item change but group not change
 */
export default defineComponent({
	name: 'LRadioGroup',
	props: groupProps,
	emits: ['update:modelValue', 'change'],
	setup(props, { emit, slots }) {
		const value = ref<string | number>(props.modelValue as string | number);

		provide(ProvideRadioKey, value);

		watch(value, val => {
			emit('change', val);
			emit('update:modelValue', val);
		});

		return () => (
			<>
				<div class='l-radio__wrapper'>{renderSlot(slots, 'default')}</div>
			</>
		);
	},
});
