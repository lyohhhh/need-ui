import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import { LInput } from '..';
import inputStyles from '../styles/input.module.scss';

describe('input', () => {
	it('input mount', () => {
		mount(LInput);
	});

	it('input `disabled` props', async () => {
		const input = ref<string>('');
		const wrapper = mount(LInput, {
			props: {
				modelValue: input.value,
			},
		});
		expect(wrapper.find('.input--disabled').exists()).toBe(false);

		await wrapper.setProps({
			disabled: true,
		});
		expect(wrapper.find('.input--disabled').exists()).toBe(true);

		wrapper.unmount();
	});

	it('input `clearable` props', async () => {
		const input = ref<string>('');
		let wrapper = mount(LInput, {
			props: {
				modelValue: input.value,
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
		const input = ref<string>('');
		['text', 'password', 'email'].forEach(type => {
			const wrapper = mount(LInput, {
				props: {
					type,
					modelValue: input.value,
				},
			});
			expect(wrapper.find('.input__inner').attributes().type).toEqual(type);
			wrapper.unmount();
		});
	});

	it('input `error` props', () => {
		const input = ref<string>('');
		const wrapper = mount(LInput, {
			props: {
				error: true,
				modelValue: input.value,
			},
		});

		expect(wrapper.find(`.${inputStyles['input__error']}`).exists()).toBe(true);

		wrapper.unmount();
	});

	it('input `placeholder` props', () => {
		const input = ref<string>('');
		let wrapper = mount(LInput, {
			props: {
				placeholder: 'test',
				modelValue: input.value,
			},
		});
		expect(wrapper.find('.input__inner').attributes().placeholder).toEqual('test');

		wrapper = mount(LInput, {
			props: {
				error: true,
				errorPlaceholder: 'errortest',
				modelValue: input.value,
			},
		});

		expect(wrapper.find('.input__inner').attributes().placeholder).toEqual('errortest');

		wrapper.unmount();
	});
});
