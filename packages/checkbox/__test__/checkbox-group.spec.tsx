import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { ref } from 'vue';
import { LCheckboxGroup, LCheckbox } from '..';

describe('checkbox-group', () => {
	it('checkbox-group mount', () => {
		mount(LCheckboxGroup);
	});

	it(`checkbox-group 'disabled' props`, async () => {
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

	it.todo(`checkbox group 'border' props`, () => {
		const wrapper = mount(LCheckboxGroup, {
			slots: {
				default: <LCheckbox label={1}></LCheckbox>,
			},
			props: {
				border: true,
			},
		});
		expect(wrapper.find('.is-border').exists()).toBe(true);
	});

	it.todo(`checkbox group 'change' func`, async () => {
		const changeFn = vi.fn();
		const checkedValue = ref<number>(0);
		const wrapper = mount(LCheckboxGroup, {
			slots: {
				default: (
					<>
						<LCheckbox label={1}></LCheckbox>
						<LCheckbox label={2}></LCheckbox>
						<LCheckbox label={3}></LCheckbox>
					</>
				),
			},
			props: {
				disabled: true,
				onChange: changeFn,
				modelValue: checkedValue as any,
			},
		});

		expect(changeFn).not.toBeCalled();
		await wrapper.findAllComponents(LCheckbox)[2].find('.l-radio').trigger('click');

		expect(changeFn).toBeCalled();
		expect(checkedValue.value).toContain(2);

		await wrapper.findAllComponents(LCheckbox)[1].find('.l-radio').trigger('click');
		expect(changeFn).toBeCalledTimes(2);
		expect(checkedValue.value).toContain(1);
	});
});
