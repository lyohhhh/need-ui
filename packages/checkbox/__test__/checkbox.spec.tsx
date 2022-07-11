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
	it.todo(`checkbox 'border' props`, () => {
		const wrapper = mount(LCheckbox, {
			props: {
				border: true,
			},
		});
		expect(wrapper.find('.is-border').exists()).toBe(true);
	});
	it.todo(`checkbox 'min' props`, () => {});
	it.todo(`checkbox 'max' props`, () => {});
	it.todo(`checkbox 'change' func`, () => {});
});
