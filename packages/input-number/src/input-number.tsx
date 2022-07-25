import { LIcon, LInput } from '../../components';
import { computed, defineComponent } from 'vue';
import { InputNumberProps } from './input-number-props';
import '../styles/input-number.scss';
import { throttle } from '@/_utils';

// 长按增加间隔
const MOUSE_DELAY = 100;

export default defineComponent({
	name: 'InputNumber',
	props: InputNumberProps,
	emits: ['update:modelValue', 'focus', 'blur', 'change'],
	setup(props, { emit }) {
		let timer: undefined | NodeJS.Timer = undefined;
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
		const minusHandle = () => {
			emit('update:modelValue', num.value - 1);
		};

		// 加
		const addHandle = () => {
			emit('update:modelValue', num.value + 1);
		};

		// 长按操作
		const mouseDownHandle = (func: Function) => {
			timer = setInterval(() => {
				func();
			}, MOUSE_DELAY);
		};

		// 删除长按
		const minusMouseDownHandle = (e: MouseEvent) => {
			e.stopPropagation();
			e.preventDefault();
			mouseDownHandle(minusHandle);
		};

		// 增加长按
		const addMouseDownHandle = (e: MouseEvent) => {
			e.stopPropagation();
			e.preventDefault();
			mouseDownHandle(addHandle);
		};

		// 清除定时器
		const clearTimer = () => {
			if (timer) {
				clearInterval(timer);
			}
		};

		return () => (
			<>
				<div class='l-input-number'>
					<span
						class='l-input-number__prefix'
						onMousedown={minusMouseDownHandle}
						onMouseup={clearTimer}
					>
						<LIcon icon='henggang' onClick={throttle(minusHandle, MOUSE_DELAY)}></LIcon>
					</span>
					<span
						class='l-input-number__suffix'
						onMousedown={addMouseDownHandle}
						onMouseup={clearTimer}
					>
						<LIcon icon='jiahao' onClick={throttle(addHandle, MOUSE_DELAY)}></LIcon>
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
