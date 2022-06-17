import { LButton } from '..';
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
describe('button component', () => {
	it('button mount', () => {
		mount(LButton);
	});

	it('button click', async () => {
		const clickFn = vi.fn(() => 1);
		const inst = mount(LButton, {
			props: {
				onClick: clickFn,
			},
		});
		await inst.trigger('click');

		expect(clickFn).toHaveBeenCalled();

		inst.unmount();
	});

	it('button loading', async () => {
		const clickFn = vi.fn(() => 1);
		const inst = mount(LButton, {
			props: {
				onClick: clickFn,
				loading: true,
			},
		});

		await inst.trigger('click');

		expect(clickFn).not.toHaveBeenCalled();
		expect(inst.find('.button').classes()).toContain('is-loading');

		inst.unmount();
	});

	it('button disabled', async () => {
		const clickFn = vi.fn(() => 1);
		const inst = mount(LButton, {
			props: {
				onClick: clickFn,
				disabled: true,
			},
		});

		await inst.trigger('click');

		expect(clickFn).not.toHaveBeenCalled();
		expect(inst.find('.button').classes()).toContain('is-disabled');

		inst.unmount();
	});
	it.todo('button size', () => {});
	it.todo('button type', () => {});
});
