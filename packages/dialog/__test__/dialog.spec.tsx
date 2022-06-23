import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { LDialog } from '..';

describe('dialog', () => {
	it('dialog mount', () => {
		mount(LDialog);
	});

	it.skip('dialog fn', async () => {
		let isShow = false;
		const cancelFn = vi.fn(() => (isShow = false));
		const confirmFn = vi.fn(() => (isShow = false));
		const inst = mount(LDialog, {
			attachTo: document.body,
			props: {
				modelValue: true,
				onCancel: cancelFn,
				onConfirm: confirmFn,
			},
		});
		isShow = true;
		await nextTick(() => {
			inst.find('.button--default').trigger('click');
			expect(inst.emitted()).toHaveProperty('cancel');
			expect(cancelFn).toBeCalled();
			expect(confirmFn).not.toBeCalled();
			expect(isShow).toEqual(false);
			isShow = true;
			expect(isShow).toEqual(true);
			inst.find('.button--primary').trigger('click');
			expect(isShow).toEqual(false);
			expect(inst.emitted()).toHaveProperty('confirm');
			expect(cancelFn).toBeCalledTimes(1);
			expect(confirmFn).toBeCalled();
		});

		inst.unmount();
	});

	it.skip('dialog slot `title`', async () => {
		const inst = mount(LDialog, {
			attachTo: document.body,
			slots: {
				title: '测试',
			},
			props: {
				modelValue: true,
			},
		});
		await nextTick(() => {
			expect(inst.find('.dialog-title').text()).toEqual('测试');
		});
	});
});
