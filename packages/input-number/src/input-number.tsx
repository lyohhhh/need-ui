import { LIcon, LInput } from '../../components';
import { defineComponent } from 'vue';
import { InputNumberProps } from './input-number-props';
import '../styles/input-number.scss';
import { throttle } from '@/_utils';
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

		// 减
		const minusHandle = throttle(() => {}, 100);
		// 加
		const addHandle = throttle(() => {}, 100);
		return () => (
			<>
				<div class='l-input-number'>
					<span class='l-input-number__prefix'>
						<LIcon icon='henggang' onClick={minusHandle}></LIcon>
					</span>
					<span class='l-input-number__suffix'>
						<LIcon icon='jiahao' onClick={addHandle}></LIcon>
					</span>
					<LInput
						type='number'
						onChange={emitChange}
						onFocus={emitFocus}
						onBlur={emitBlur}
						clearable={false}
					></LInput>
				</div>
			</>
		);
	},
});
