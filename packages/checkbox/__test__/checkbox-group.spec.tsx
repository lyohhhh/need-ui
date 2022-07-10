import { mount } from '@vue/test-utils';
import { LCheckboxGroup, LCheckbox } from '..';

describe('checkbox-group', () => {
	it('checkbox-group mount', () => {
		mount(LCheckboxGroup);
	});

	it.only(`checkbox-group 'disabled' props`, () => {
		const wrapper = mount(LCheckboxGroup, {
			slots: {
				default: <LCheckbox label={1}></LCheckbox>,
			},
			props: {
				disabled: true,
			},
		});

		expect(wrapper.find('.is-disabled').exists()).toBe(true);
	});
	it.todo(`checkbox group 'border' props`, () => {});
	it.todo(`checkbox group 'change' func`, () => {});
});
