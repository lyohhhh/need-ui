import { mount } from '@vue/test-utils';
import { LIcon } from '..';
import { vi } from 'vitest';

describe('icon', () => {
	it('icon mount', () => {
		mount(LIcon);
	});

	it('icon click ', () => {
		const clickFunc = vi.fn(() => 1);
		const inst = mount(LIcon, {
			props: {
				icon: 'dark',
				onClick: clickFunc,
			},
		});

		inst.trigger('click');
		expect(clickFunc).toHaveBeenCalled();
		inst.unmount();
	});

	it('icon name is required', () => {
		console.warn = vi.fn();
		mount(LIcon, {});
		expect(console.warn).toHaveBeenCalled();
	});
});
