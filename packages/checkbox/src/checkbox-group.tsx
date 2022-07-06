import { defineComponent, isRef, provide, type Ref, ref, renderSlot, watch } from 'vue';
import { checkboxGroupProps, type ListType } from './checkbox-group-props';

export const ProvideCheckboxKey = Symbol('checkbox');

export const ProvideCheckboxDisabled = Symbol('disabled');

export const ProvideCheckboxBorder = Symbol('border');

export type ModelValue<T = ListType> = Ref<T>;

export default defineComponent({
	name: 'CheckboxGroup',
	props: checkboxGroupProps,
	emits: ['update:modelValue', 'change'],
	setup(props, { slots, emit }) {
		let provideValue = (props.modelValue || props.value) as ListType;
		const value = ref<ListType>(provideValue);

		provide(ProvideCheckboxKey, value);

		provide(ProvideCheckboxDisabled, props.disabled);

		provide(ProvideCheckboxBorder, props.border);

		watch(
			() => props.modelValue,
			val => {
				/**
				 * 不改变元素组地址 去重
				 * 使用 set 去重会导致 watch 监听不到
				 */

				if (val && val.length) {
					val.forEach(item => {
						if (!value.value.includes(item)) {
							value.value.push(item);
						}
					});
				} else {
					value.value.length = 0;
				}
			},
			{
				deep: true,
			}
		);

		watch(
			value.value,
			list => {
				const checkedList = isRef(list) ? list.value : list;
				emit('change', checkedList);
				emit('update:modelValue', checkedList);
			},
			{
				deep: true,
			}
		);

		return () => (
			<>
				<div class='l-checkbox-group'>{renderSlot(slots, 'default')}</div>
			</>
		);
	},
});
