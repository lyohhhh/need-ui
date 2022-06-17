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
	});
	it.todo('button loading', () => {});
	it.todo('button disabled', () => {});
	it.todo('button size', () => {});
	it.todo('button type', () => {});
});
