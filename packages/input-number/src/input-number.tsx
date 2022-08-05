import { LIcon, LInput } from '../../components';
import { computed, defineComponent } from 'vue';
import { InputNumberProps } from './input-number-props';
import { throttle } from '@/_utils';
import { isNumber } from '@/[shared]/number';
import { stopDefault } from '@/[shared]/mouse';
import '../styles/input-number.scss';

// 长按增加间隔
const MOUSE_DELAY = 150;
// 节流时间
const THROTTLE_TIME = 250;

export default defineComponent({
	name: 'InputNumber',
	props: InputNumberProps,
	emits: ['update:modelValue', 'focus', 'blur', 'change'],
	setup(props, { emit }) {
		let timer: undefined | NodeJS.Timer = undefined;
		const defaultNumber = props.modelValue;

		const classes = computed<string>(() => {
			return `is-` + props.controlsPosition;
		});

		// number 改变
		const emitChange = (num: number) => {
			emit('update:modelValue', Number(num).toFixed(props.precision));
			emit('change', num);
		};
		// 获取焦点
		const emitFocus = (num: number) => {
			emit('focus', num);
		};
		// 失去焦点
		const emitBlur = (num: number) => {
			// 边界情况
			// max
			if (+num > +props.max) {
				num = props.max;
				emitChange(props.max);
				emit('blur', props.max);
				return;
				// min
			} else if (+num < +props.min) {
				num = props.min;
				emitChange(props.min);
				emit('blur', props.min);
				return;
			}
			emit('blur', Number(num).toFixed(props.precision));
		};
		// 使用 computed 获取 modelValue
		const num = computed<number>(() => {
			return isNumberComputed.value ? +props.modelValue : defaultNumber;
		});
		// 判断 modelValue 是否是数字
		const isNumberComputed = computed<boolean>(() => {
			return isNumber(props.modelValue);
		});

		// 减
		const minusHandle = () => {
			if (num.value <= props.min) return;
			// 严格步长
			emitChange(num.value - (props.stepStrictly ? (isNumber(props.step) ? props.step : 1) : 1));
		};

		// 加
		const addHandle = () => {
			if (num.value >= props.max) return;
			// 严格步长
			emitChange(num.value + (props.stepStrictly ? (isNumber(props.step) ? props.step : 1) : 1));
		};

		// 长按操作
		const mouseDownHandle = (func: Function) => {
			timer = setInterval(() => {
				func();
			}, MOUSE_DELAY);
		};

		// 删除长按
		const minusMouseDownHandle = (e: MouseEvent) => {
			if (e.button == 0) {
				stopDefault(e);
				mouseDownHandle(minusHandle);
			}
		};

		// 增加长按
		const addMouseDownHandle = (e: MouseEvent) => {
			if (e.button == 0) {
				stopDefault(e);
				mouseDownHandle(addHandle);
			}
		};

		// 清除定时器
		const clearTimer = () => {
			if (timer) {
				clearInterval(timer);
			}
		};

		return () => (
			<>
				<div class={['l-input-number', classes.value]}>
					<span
						class={['l-input-number__prefix', num.value <= props.min ? 'is-disabled' : null]}
						onMousedown={minusMouseDownHandle}
						onMouseup={clearTimer}
					>
						<LIcon
							icon='henggang'
							class={'l-input-number__down'}
							onClick={throttle(minusHandle, THROTTLE_TIME)}
						></LIcon>
					</span>
					<span
						class={['l-input-number__suffix', num.value >= props.max ? 'is-disabled' : null]}
						onMousedown={addMouseDownHandle}
						onMouseup={clearTimer}
					>
						<LIcon
							icon='jiahao'
							class={'l-input-number__up'}
							onClick={throttle(addHandle, THROTTLE_TIME)}
						></LIcon>
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
