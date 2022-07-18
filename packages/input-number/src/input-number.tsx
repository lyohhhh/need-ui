import { LInput } from '../../components';
import { defineComponent, renderSlot } from 'vue';
import { InputNumberProps } from './input-number-props';
import '../styles/input-number.scss';
export default defineComponent({
	name: 'InputNumber',
	props: InputNumberProps,
	emits: ['update:modelValue', 'focus', 'blur', 'change'],
	setup(_props, { emit }) {
		const emitChange = (args: number) => {
			emit('change', args);
		};
		const emitFocus = (args: number) => {
			emit('focus', args);
		};
		const emitBlur = (args: number) => {
			emit('focus', args);
		};

		return () => (
			<>
				<div class='l-input-number'>
					<LInput
						type='number'
						onChange={emitChange}
						onFocus={emitFocus}
						onBlur={emitBlur}
						clearable={false}
						v-slots={{
							suffix: () => 1,
							prefix: () => 2,
						}}
					></LInput>
				</div>
			</>
		);
	},
});
