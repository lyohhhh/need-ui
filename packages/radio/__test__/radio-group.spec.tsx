import { mount } from '@vue/test-utils';
import { LRadio, LRadioGroup } from '..';
import { vi } from 'vitest';
import { ref } from 'vue';

describe('radio-group', () => {
	it('radio-group mount', () => {
		mount(LRadioGroup);
	});

	it(`radio 'default' slots`, () => {
		const group = mount(LRadioGroup, {
			slots: {
				default: <LRadio></LRadio>,
			},
		});

		expect(group.find('.l-radio').exists()).toBe(true);
		group.unmount();
	});

	it(`radio 'change' func`, async () => {
		const changeFn = vi.fn();
		const checked = ref<string>('');

		const group = mount(LRadioGroup, {
			slots: {
				default: (
					<>
						{['1', '2', '3'].map(label => {
							return <LRadio label={label}></LRadio>;
						})}
					</>
				),
			},
			props: {
				modelValue: checked as any,
				onChange: changeFn,
			},
		});

		expect(changeFn).not.toBeCalled();

		await group.find('.l-radio').trigger('click');
		expect(changeFn).toBeCalled();
		expect(checked.value).toEqual('1');

		await group.findAllComponents(LRadio)[2].find('.l-radio').trigger('click');
		expect(changeFn).toBeCalledTimes(2);
		expect(checked.value).toEqual('3');
	});

	it(`group 'disabled' props`, () => {
		const group = mount(LRadioGroup, {
			props: {
				disabled: true,
			},
			slots: {
				default: (
					<>
						<LRadio label='1'></LRadio>
					</>
				),
			},
		});

		expect(group.find('.is-disabled').exists()).toBe(true);
	});
});
