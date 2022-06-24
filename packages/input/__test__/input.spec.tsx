import { mount } from '@vue/test-utils';
import { LInput } from '..';
import inputStyles from '../styles/input.module.scss';

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

	it('input `type` props', () => {
		['text', 'password', 'email'].forEach(type => {
			const wrapper = mount(LInput, {
				props: {
					type,
				},
			});
			expect(wrapper.find('.input__inner').attributes().type).toEqual(type);
			wrapper.unmount();
		});
	});

	it('input `error` props', () => {
		const wrapper = mount(LInput, {
			props: {
				error: true,
			},
		});

		expect(wrapper.find(`.${inputStyles['input__error']}`).exists()).toBe(true);

		wrapper.unmount();
	});

	it('input `placeholder` props', () => {
		let wrapper = mount(LInput, {
			props: {
				placeholder: 'test',
			},
		});
		expect(wrapper.find('.input__inner').attributes().placeholder).toEqual('test');

		wrapper = mount(LInput, {
			props: {
				error: true,
				errorPlaceholder: 'errortest',
			},
		});

		expect(wrapper.find('.input__inner').attributes().placeholder).toEqual('errortest');

		wrapper.unmount();
	});
});
