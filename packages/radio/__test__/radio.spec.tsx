import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import { LRadio } from '..';

describe('radio', () => {
	it('radio mount', () => {
		mount(LRadio);
	});

	it(`radio 'modelValue' props`, async () => {
		const radioChecked = ref<string>('');
		const radioComponent = () => (
			<>
				<LRadio v-model={radioChecked.value} label='1'></LRadio>
			</>
		);

		const radio = mount(radioComponent);
		await radio.find('.l-radio').trigger('click');
		expect(radioChecked.value).toContain('1');
	});

	it(`radio 'disabled' props`, async () => {
		const changeHandle = vi.fn();

		const radio = mount(LRadio, {
			props: {
				disabled: true,
				label: '1',
				onChange: changeHandle,
			},
		});

		await radio.find('.l-radio').trigger('click');
		expect(changeHandle).not.toBeCalled();
	});

	it(`radio 'border' props`, () => {
		const radio = mount(LRadio, {
			props: {
				border: true,
			},
		});

		expect(radio.find('.is-border').exists()).toBe(true);
	});

	it(`radio 'name' props`, () => {
		const radio = mount(LRadio, {
			props: {
				name: 'test',
			},
		});
		expect(radio.find('input').attributes().name).toContain('test');
	});
});
