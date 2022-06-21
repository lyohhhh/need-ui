import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { LDialog } from '..';

describe('dialog', () => {
	it('dialog mount', () => {
		mount(LDialog);
	});

	it.todo('dialog fn', async () => {
		const cancelFn = vi.fn(() => 'cancel');
		const confirmFn = vi.fn(() => 'confirm');
		const inst = mount(LDialog, {
			props: {
				onCancel: cancelFn,
				onConfirm: confirmFn,
				modelValue: true,
			},
		});
		await nextTick();
	});
});
