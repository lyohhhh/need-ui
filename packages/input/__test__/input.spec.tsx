import { mount } from '@vue/test-utils';
import { LInput } from '..';

describe('input', () => {
	it('input mount', () => {
		mount(LInput);
	});

	it('input `disabled` props', async () => {
		const wrapper = mount(LInput);
		expect(wrapper.find('.input--disabled').exists()).toBe(false);

		await wrapper.setProps({
			disabled: true,
		});
		expect(wrapper.find('.input--disabled').exists()).toBe(true);

		wrapper.unmount();
	});

	it('input `clearable` props', async () => {
		let wrapper = mount(LInput, {
			props: {
				modelValue: 'test',
			},
		});
		expect(wrapper.find('.input--clear').exists()).toBe(false);

		wrapper.unmount();
		wrapper = mount(LInput, {
			props: {
				modelValue: 'test',
				clearable: false,
			},
		});

		expect(wrapper.find('.input--clear').exists()).toBe(false);
		wrapper.unmount();
	});
});
