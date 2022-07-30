import { mount } from '@vue/test-utils';
import { LInputNumber } from '..';
import { vi } from 'vitest';

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

	it.todo(`input-number 'add' func`, () => {
		const wrapper = mount(LInputNumber);
	});
	it.todo(`input-number 'minus' func`, () => {
		const wrapper = mount(LInputNumber);
	});
	it.todo(`input-number 'long mouse down' func`, () => {
		const wrapper = mount(LInputNumber);
	});
});
