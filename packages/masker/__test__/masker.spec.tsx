import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { LMasker } from '..';
import { vi } from 'vitest';

describe('masker', () => {
	it('masker mount', () => {
		mount(LMasker);
	});

	it.todo('masker close', async () => {
		const show = ref<boolean>(true);
		const changeHandle = vi.fn(() => {
			show.value = false;
		});
		const wrapper = mount(LMasker, {
			props: {
				show: show.value,
				onChange: changeHandle,
			},
		});
		await nextTick();
		await wrapper.trigger('change');
		expect(changeHandle).toBeCalled();
	});
});
