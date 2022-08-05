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
		const model = ref<number>(0);
		const modelFn = (num: number) => (model.value = +num);
		const changeFn = vi.fn();
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
	});
	it.todo(`input-number 'long mouse down' func`, () => {
		const wrapper = mount(LInputNumber);
	});
});
