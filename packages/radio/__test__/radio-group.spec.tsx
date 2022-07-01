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
});
