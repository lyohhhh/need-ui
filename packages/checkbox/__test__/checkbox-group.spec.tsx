import { mount } from '@vue/test-utils';
import { LCheckboxGroup } from '..';

describe('checkbox-group', () => {
	it('checkbox-group mount', () => {
		mount(LCheckboxGroup);
	});

	
	it.todo(`checkbox 'disabled' props` ,() => {
		mount(LCheckboxGroup)
	})
	it.todo(`checkbox 'border' props` ,() => {})
	it.todo(`checkbox 'change' func` ,() => {})
});
