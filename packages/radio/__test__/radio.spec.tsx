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

	it.todo(`radio 'disabled' props`, () => {});
});
