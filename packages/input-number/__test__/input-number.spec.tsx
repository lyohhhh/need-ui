import { mount } from '@vue/test-utils';
import { LInputNumber } from '..';
import { vi } from 'vitest';
import { ref } from 'vue';

describe('input-number', () => {
	it('mount input-number component', () => {
		mount(LInputNumber);
	});

	it(`input-number 'disabled' props`, async () => {
		const changeFn = vi.fn();
		const wrapper = mount(LInputNumber, {
			props: {
				disabled: true,
				onChange: changeFn,
			},
		});

		await wrapper.find('.l-input-number__up').trigger('click');
		expect(changeFn).not.toBeCalled();

		await wrapper.setProps({
			disabled: false,
		});
		await wrapper.find('.l-input-number__up').trigger('click');
		expect(changeFn).toBeCalled();
	});

	it(`input-number 'change' func`, async () => {
		const changeFn = vi.fn();
		const model = ref<number>(0);
		const modelFn = async (num: number) => {
			model.value = +num;
			await wrapper.setProps({
				modelValue: model.value,
			});
		};
		const wrapper = mount(LInputNumber, {
			props: {
				modelValue: model.value,
				onChange: changeFn,
				'onUpdate:modelValue': modelFn,
			},
		});
		expect(changeFn).not.toBeCalled();

		await wrapper.find('.l-input-number__up').trigger('click');
		expect(changeFn).toBeCalledTimes(1);
		expect(model.value).toEqual(1);

		await wrapper.find('.l-input-number__down').trigger('click');
		expect(changeFn).toBeCalledTimes(2);
		expect(model.value).toEqual(0);
	});

	it(`input-number 'step' props`, async () => {
		const model = ref<number>(0);
		const modelFn = async (num: number) => {
			model.value = +num;
			await wrapper.setProps({
				modelValue: model.value,
			});
		};
		const wrapper = mount(LInputNumber, {
			props: {
				modelValue: model.value,
				step: 5,
				stepStrictly: true,
				'onUpdate:modelValue': modelFn,
			},
		});
		await wrapper.find('.l-input-number__up').trigger('click');
		expect(model.value).toEqual(5);
	});
});
