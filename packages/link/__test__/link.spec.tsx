import { mount } from '@vue/test-utils';
import { type ComponentInternalInstance, getCurrentInstance, ref, nextTick } from 'vue';
import { LLink } from '..';

describe('link', () => {
	it('link mount', () => {
		mount(LLink);
	});

	it(`link 'type' props`, () => {
		(['success', 'default', 'warning', 'primary', 'danger'] as const).forEach(type => {
			const wrapper = mount(LLink, {
				props: {
					type,
				},
			});
			expect(wrapper.find('.l-link').classes()).toContain(`l-link--${type}`);
			wrapper.unmount();
		});
	});

	it(`link 'disabled' props`, async () => {
		const wrapper = mount(LLink, {
			props: {
				disabled: false,
			},
		});
		expect(wrapper.find('.l-link').classes()).not.toContain(`is-disabled`);
		await wrapper.setProps({
			disabled: true,
		});
		expect(wrapper.find('.l-link').classes()).toContain(`is-disabled`);
		wrapper.unmount();
	});

	it(`link 'underline' props`, async () => {
		const wrapper = mount(LLink, {
			props: {
				underline: false,
			},
		});
		expect(wrapper.find('.l-link').classes()).not.toContain(`is-underline`);
		await wrapper.setProps({
			underline: true,
		});
		expect(wrapper.find('.l-link').classes()).toContain(`is-underline`);
		wrapper.unmount();
	});

	it(`link 'href' props`, () => {
		const wrapper = mount(LLink, {
			props: {
				disabled: false,
				underline: true,
				href: 'http://www.baidu.com',
			},
		});
		Object.defineProperty(window, 'location', {
			value: {
				href: 'http://www.baidu.com',
			},
		});
		wrapper.find('.l-link').trigger('click');
		expect(window.location.href).toEqual('http://www.baidu.com');
	});
});
