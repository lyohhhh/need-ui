import { mount } from '@vue/test-utils';
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

	it(`link 'icon' props`, async () => {
		const wrapper = mount(LLink, {
			props: {
				icon: 'dark',
			},
		});
		expect(wrapper.find('.l-icon').exists()).toBe(true);
	});
});
