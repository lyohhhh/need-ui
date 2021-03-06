import { mount } from '@vue/test-utils';
import { LFooter } from '..';

describe('footer', () => {
	it('footer mount', () => {
		mount(LFooter);
	});

	it('footer slots `default`', () => {
		const inst = mount(LFooter, {
			slots: {
				default: '测试',
			},
		});

		expect(inst.find('.l-footer').text()).toEqual('测试');

		inst.unmount();
	});
});
