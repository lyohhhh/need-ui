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
		wrapper.unmount();
	});

	it(`checkbox group 'border' props`, () => {
		const wrapper = mount(LCheckboxGroup, {
			slots: {
				default: <LCheckbox label={1}></LCheckbox>,
			},
			props: {
				border: true,
			},
		});
		expect(wrapper.find('.is-border').exists()).toBe(true);
		wrapper.unmount();
	});

	it(`checkbox group 'change' func`, async () => {
		const changeFn = vi.fn();
		const checkedValue = ref<number[]>([]);
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
				onChange: changeFn,
				modelValue: checkedValue.value,
			},
		});

		expect(changeFn).not.toBeCalled();
		await wrapper.findAllComponents(LCheckbox)[2].find('.l-checkbox').trigger('click');

		expect(changeFn).toBeCalled();
		expect(checkedValue.value).toContain(3);

		await wrapper.findAllComponents(LCheckbox)[1].find('.l-checkbox').trigger('click');
		expect(changeFn).toBeCalledTimes(2);
		expect(checkedValue.value).toContain(3);
		expect(checkedValue.value).toContain(2);
		expect(checkedValue.value).not.toContain(1);

		wrapper.unmount();
	});

	it(`checkbox 'min & max' props`, async () => {
		const changeFn = vi.fn();

		const checkedValue = ref<number[]>([1]);
		const wrapper = mount(LCheckboxGroup, {
			slots: {
				default: (
					<>
						<LCheckbox label={1}></LCheckbox>
						<LCheckbox label={2}></LCheckbox>
						<LCheckbox label={3}></LCheckbox>
						<LCheckbox label={4}></LCheckbox>
						<LCheckbox label={5}></LCheckbox>
						<LCheckbox label={6}></LCheckbox>
					</>
				),
			},
			props: {
				modelValue: checkedValue.value,
				min: 1,
				max: 2,
				onChange: changeFn,
			},
		});
		await wrapper.findAllComponents(LCheckbox)[0].find('.l-checkbox').trigger('click');
		expect(changeFn).not.toBeCalled();
		expect(checkedValue.value.join('')).toBe('1');

		await wrapper.findAllComponents(LCheckbox)[1].find('.l-checkbox').trigger('click');
		expect(changeFn).toBeCalledTimes(1);
		expect(checkedValue.value.join(',')).toBe('1,2');

		await wrapper.findAllComponents(LCheckbox)[2].find('.l-checkbox').trigger('click');
		expect(changeFn).toBeCalledTimes(1);
		expect(checkedValue.value.join(',')).toBe('1,2');

		await wrapper.findAllComponents(LCheckbox)[1].find('.l-checkbox').trigger('click');
		expect(changeFn).toBeCalledTimes(2);
		expect(checkedValue.value.join(',')).toBe('1');
	});
});
