import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { LDialog } from '..';

describe('dialog', () => {
	it('dialog mount', () => {
		mount(LDialog);
	});

	it('dialog fn', async () => {
		const cancelFn = vi.fn(() => 'cancel');
		const confirmFn = vi.fn(() => 'confirm');
		const inst = mount(LDialog, {
			props: {
				modelValue: true,
				onCancel: cancelFn,
				onConfirm: confirmFn,
			},
		});
		await nextTick(() => {
			console.log(inst.html());
		});
	});
});
