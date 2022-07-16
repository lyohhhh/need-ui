import { mount } from '@vue/test-utils';
import { LInputNumber } from '..';
import { vi } from 'vitest';

describe('input-number', () => {
	it('mount input-number component', () => {
		mount(LInputNumber);
	});

	it.todo(`input-number 'disabled' props`, () => {
		const changeFn = vi.fn();
		const wrapper = mount(LInputNumber, {
			props: {
				disabled: true,
				onChange: changeFn,
			},
		});
	});
});
