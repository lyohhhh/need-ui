import { mount, shallowMount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { LDialog } from '..';

describe('dialog', () => {
	it('dialog mount', () => {
		mount(LDialog);
	});

	it.skip('dialog fn', async () => {
		const cancelFn = vi.fn(() => 'cancel');
		const confirmFn = vi.fn(() => 'confirm');
		const isShow = ref<boolean>(false);
		const inst = mount(LDialog, {
			props: {
				modelValue: isShow.value as boolean,
				onCancel: cancelFn,
				onConfirm: confirmFn,
			},
		});
		await nextTick(() => {});
	});

	it.todo('dialog slot `title`', () => {
		const inst = mount(LDialog, {
			slots: {
				title: '测试',
			},
		});
		expect(inst.find('.dialog-title')).toEqual(null);
		// expect(inst.find('.dialog-title')).toEqual('测试');
	});
});
