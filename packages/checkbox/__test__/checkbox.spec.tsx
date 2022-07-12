import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import { vi } from 'vitest';
import { LCheckbox } from '..';

describe('checkbox', () => {
	it('checkbox mount', () => {
		mount(LCheckbox);
	});

	it(`checkbox 'disabled' props`, async () => {
		const checkedValue = ref<boolean>(false);
		const changeFn = vi.fn();

		const wrapper = mount(LCheckbox, {
			props: {
				disabled: true,
				modelValue: checkedValue as any,
				onChange: changeFn,
			},
		});

		expect(changeFn).not.toBeCalled();
		await wrapper.find('.l-checkbox').trigger('click');

		expect(changeFn).not.toBeCalled();
		expect(checkedValue.value).toBe(false);
	});
	it(`checkbox 'border' props`, () => {
		const wrapper = mount(LCheckbox, {
			props: {
				border: true,
			},
		});
		expect(wrapper.find('.is-border').exists()).toBe(true);
	});
	it(`checkbox 'change' func`, async () => {
		const checkedValue = ref<boolean>(false);
		const changeFn = vi.fn((isChecked: boolean) => {
			checkedValue.value = isChecked;
		});

		const wrapper = mount(LCheckbox, {
			props: {
				modelValue: checkedValue.value,
				onChange: changeFn,
			},
		});

		expect(changeFn).not.toBeCalled();

		await wrapper.find('.l-checkbox').trigger('click');
		expect(changeFn).toBeCalled();
		expect(checkedValue.value).toBe(true);

		await wrapper.setProps({
			modelValue: checkedValue.value,
		});

		await wrapper.find('.l-checkbox').trigger('click');
		expect(changeFn).toBeCalledTimes(2);
		expect(checkedValue.value).toBe(false);
	});

	it(`checkbox 'indeterminate' props`, () => {
		const wrapper = mount(LCheckbox, {
			props: {
				indeterminate: true,
			},
		});
		expect(wrapper.find('.is-indeterminate').exists()).toBe(true);
	});
});
