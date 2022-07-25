import { LIcon, LInput } from '../../components';
import { computed, defineComponent } from 'vue';
import { InputNumberProps } from './input-number-props';
import '../styles/input-number.scss';
import { throttle } from '@/_utils';
export default defineComponent({
	name: 'InputNumber',
	props: InputNumberProps,
	emits: ['update:modelValue', 'focus', 'blur', 'change'],
	setup(props, { emit }) {
		const defaultNumber = props.modelValue;
		// number 改变
		const emitChange = (num: number) => {
			emit('update:modelValue', num);
			emit('change', num);
		};
		// 获取焦点
		const emitFocus = (num: number) => {
			emit('focus', num);
		};
		// 失去焦点
		const emitBlur = (num: number) => {
			emit('focus', num);
		};
		// 使用 computed 获取 modelValue
		const num = computed<number>(() => {
			return isNumber.value ? +props.modelValue : defaultNumber;
		});
		// 判断 modelValue 是否是数字
		const isNumber = computed<boolean>(() => {
			return !isNaN(+props.modelValue);
		});

		// 减
		const minusHandle = throttle(() => {
			emit('update:modelValue', num.value - 1);
		}, 100);

		// 加
		const addHandle = throttle(() => {
			emit('update:modelValue', num.value + 1);
		}, 100);

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
						v-model={props.modelValue}
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
