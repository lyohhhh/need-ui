import { mount } from '@vue/test-utils';
import { LSelect } from '..';

describe('select', () => {
	it('select mount', () => {
		mount(LSelect);
	});

	it.todo('select disabled', async () => {
		const wrapper = mount(LSelect, {
			props: {
				disabled: true,
			},
		});
	});

	it.todo(`select 'filterable' props`, () => {});
	it.todo(`select 'clearable' props`, () => {});
	it.todo(`select 'mutilute' props`, () => {});
});
