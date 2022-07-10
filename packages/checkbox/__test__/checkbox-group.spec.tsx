import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { LCheckboxGroup, LCheckbox } from '..';

describe('checkbox-group', () => {
	it('checkbox-group mount', () => {
		mount(LCheckboxGroup);
	});

	it.only(`checkbox-group 'disabled' props`, async () => {
		const changeFn = vi.fn();

		const wrapper = mount(LCheckboxGroup, {
			slots: {
				default: <LCheckbox label={1} onChange={changeFn}></LCheckbox>,
			},
			props: {
				disabled: true,
			},
		});

		expect(changeFn).not.toBeCalled();
		expect(wrapper.find('.is-disabled').exists()).toBe(true);

		await wrapper.find('.l-checkbox').trigger('click');
		expect(changeFn).not.toBeCalled();
	});
	it.todo(`checkbox group 'border' props`, () => {});
	it.todo(`checkbox group 'change' func`, () => {});
});
