import { LIcon } from '../../components';
import {
	computed,
	defineComponent,
	inject,
	InputHTMLAttributes,
	ref,
	renderSlot,
	Transition,
} from 'vue';
import props from './props';
import { debounce } from '../../_utils';
import inputStyles from '../styles/input.module.scss';
export default defineComponent({
	name: 'Input',
	props,
	emits: ['update:modelValue'],
	setup(props, { slots, emit }) {
		const inputEl = ref<HTMLElement>();
		const show = ref<boolean>();
		const isFocus = ref<boolean>();
		const isShow = computed<boolean>(() => {
			return Boolean(props.modelValue) && Boolean(show.value);
		});
		// 注入 form item
		const formItem = inject<any>('formItemProvide');
		// 触发 form item 的效验方法
		const triggerFormItemValidate = () => {
			formItem && formItem.emitter.emit('validate');
		};

		// 渲染 尾部
		const renderPrefixIcon = () => {
			const prefixClass =
				'bottom-0 left-0.5 top-0 absolute w-8 flex justify-center items-center text-gray-400';
			if (slots.prefix)
				return <span class={['l-input--prefix', prefixClass]}>{renderSlot(slots, 'prefix')}</span>;
			if (props.prefixIcon)
				return (
					<span class={['l-input--prefix__icon', prefixClass]}>
						<LIcon icon={props.prefixIcon}></LIcon>
					</span>
				);
			return null;
		};

		// 渲染头部
		const renderSuffix = () => {
			if (props.clearable)
				return (
					<Transition
						enterFromClass={inputStyles['fade-enter']}
						leaveToClass={inputStyles['fade-enter']}
						enterActiveClass={inputStyles['fade-active']}
						leaveActiveClass={inputStyles['fade-active']}
					>
						{isShow.value ? (
							<div
								class='l-input--suffix__wrap input-clear absolute flex z-10 right-0 top-0 h-full w-8 justify-center items-center cursor-pointer '
								onClick={() => {
									emit('update:modelValue', '');
									triggerFormItemValidate();
								}}
							>
								<LIcon
									icon='roundclose'
									class='l-input--suffix__icon text-gray-300  hover:text-gray-400 group-active:flex  dark:text-gray-400 dark:hover:text-gray-300'
								></LIcon>
							</div>
						) : null}
					</Transition>
				);
			if (slots.suffix)
				return (
					<span class='l-input--suffix bottom-0 right-0.5 top-0 absolute w-8 flex justify-center items-center text-gray-400'>
						{renderSlot(slots, 'suffix')}
					</span>
				);
			if (props.suffixIcon)
				return (
					<span class='l-input--suffix__icon'>
						<LIcon icon={props.suffixIcon}></LIcon>
					</span>
				);
			return null;
		};

		// 发送事件
		const emitInput = debounce(
			(e: Event) => {
				const target = e.target as InputHTMLAttributes;
				emit('update:modelValue', target.value);
				triggerFormItemValidate();
			},
			100,
			false
		);

		/**
		 * wrapper mouseover 事件
		 * 判断 clearable icon 是否显示
		 */
		const wrapperHover = () => {
			show.value = true;
		};

		/**
		 * wrapper mouseleave 事件
		 * 判断 clearable icon 是否显示
		 */
		const wrapperLeave = () => {
			// 如果是获取焦点状态 则一直展示 icon
			if (!isFocus.value) {
				show.value = false;
			}
		};

		/**
		 * wrapper down 事件
		 * 最先执行 > clearable icon Click
		 * 防止 input 边框闪烁 并自动获取焦点
		 */
		const wrapperDown = () => {
			setTimeout(() => {
				inputEl.value?.focus();
			});
		};

		/**
		 * 获取 input 获取焦点事件
		 */
		const inputFocus = () => {
			isFocus.value = true;
		};

		/**
		 * 获取 input 失去焦点事件
		 */
		const inputBlur = () => {
			isFocus.value = false;
			// 调用 wrapperLeave 事件
			wrapperLeave();
			triggerFormItemValidate();
		};

		return () => (
			<div
				class={['l-input group relative', props.disabled && inputStyles['is-disabled']]}
				onMouseover={wrapperHover}
				onMouseout={wrapperLeave}
				onMousedown={wrapperDown}
			>
				{renderPrefixIcon()}
				<input
					class={[
						`l-input__inner outline-none bg-white block w-full rounded border px-4 py-2 text-sm hover:border-gray-400 focus:border-themetextcolor-500 placeholder-gray-300 transition-all text-gray-600 dark:bg-themebgcolor-800 dark:border-themebgcolor-600 caret-themebgcolor-400 dark:text-gray-400 dark:hover:border-themebgcolor-500 dark:focus:border-themetextcolor-600 dark:placeholder-gray-400`,
						props.error && inputStyles['l-input__error'],
						props.disabled && `l-input--disabled`,
						(props.prefixIcon || slots.prefix) && 'pl-8',
						(props.clearable || props.suffixIcon || slots.suffix) && 'pr-8',
					]}
					data-type='input'
					type={props.type}
					placeholder={props.error ? props.errorPlaceholder : props.placeholder}
					value={props.modelValue}
					v-model={props.modelValue}
					onInput={emitInput}
					disabled={props.disabled}
					ref={inputEl}
					onFocus={inputFocus}
					onBlur={inputBlur}
				/>
				{renderSuffix()}
			</div>
		);
	},
});
