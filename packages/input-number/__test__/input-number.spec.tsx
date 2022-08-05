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
	});

	it(`input-number 'add' func`, async () => {
		const model = ref<number>(0);
		const changeFn = vi.fn();
		const wrapper = mount(LInputNumber, {
			props: {
				modelValue: model as any,
				onChange: changeFn,
			},
		});
		expect(changeFn).not.toBeCalled();
		await wrapper.find('.l-input-number__suffix .l-icon').trigger('click');
	});
	it.todo(`input-number 'minus' func`, () => {
		const wrapper = mount(LInputNumber);
	});
	it.todo(`input-number 'long mouse down' func`, () => {
		const wrapper = mount(LInputNumber);
	});
});
