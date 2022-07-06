import { defineComponent, isRef, provide, ref, renderSlot, watch } from 'vue';
import { checkboxGroupProps } from './checkbox-group-props';

export const ProvideCheckboxKey = Symbol('checkbox');

export const ProvideCheckboxDisabled = Symbol('disabled');

export const ProvideCheckboxBorder = Symbol('border');

export default defineComponent({
	name: 'CheckboxGroup',
	props: checkboxGroupProps,
	emits: ['update:modelValue', 'change'],
	setup(props, { slots, emit }) {
		const provideValue = (props.modelValue || props.value) as (string | number)[];
		const value = ref<(string | number)[]>(provideValue);

		const injectValue = () => {
			provide(ProvideCheckboxKey, value);
		};

		injectValue();

		provide(ProvideCheckboxDisabled, props.disabled);

		provide(ProvideCheckboxBorder, props.border);

		watch(
			() => props.modelValue,
			() => {
				value.value = props.modelValue as (string | number)[];
				injectValue();
			}
		);

		watch(provideValue, list => {
			const checkedList = isRef(list) ? list.value : list;
			emit('change', checkedList);
			emit('update:modelValue', checkedList);
		});

		return () => (
			<>
				<div class='l-checkbox-group'>{renderSlot(slots, 'default')}</div>
			</>
		);
	},
});
