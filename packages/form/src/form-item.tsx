import {
	defineComponent,
	inject,
	onMounted,
	ref,
	renderSlot,
	provide,
	toRefs,
	Transition,
	reactive,
} from 'vue';
import { default as FormItemProp } from './form-item-props';
import itemStyles from '../styles/formItem.module.scss';
import { FormItem as FormItemType, key } from './shared';
import Schema from 'async-validator';
import { Events, emitter as emitBus } from '@/[shared]/emitter';
import mitt from 'mitt';
import { useExpose } from '@/hooks/useExpose';

const FormItem = defineComponent({
	name: 'FormItem',
	props: FormItemProp,
	setup(props, { slots }) {
		const error = ref<string>('');
		const isError = ref<boolean>(false);
		const formProp = inject(key);
		const emitter = mitt<Events>();
		const isRequired = ref<boolean>(false);

		// 遍历判断是否 required 添加样式
		for (const rule in props.rules) {
			if (props.rules[rule]?.required) {
				isRequired.value = !!props.rules?.required;
				break;
			}
		}

		// debugger;
		// 通过 async-validator 进行效验
		// 并将该方法监听 通过 emitter
		const validate = () => {
			if (formProp?.rules === undefined) {
				return Promise.resolve({ result: true });
			}
			// 获取当前 item 的 prop
			const prop = props.prop as string;
			// 获取当前 item 的 rule
			const rule = formProp.rules[prop];
			// 如果没有 rule 的话 直接返回成功
			if (!rule) {
				return Promise.resolve({ result: true });
			}
			const value = formProp.model[prop];
			// 通过第三方注入
			const schema = new Schema({ [prop]: rule });
			// 通过第三方进行验证
			return schema.validate({ [prop]: value }, err => {
				if (err) {
					isError.value = true;
					error.value = rule[0].message || '效验错误';
				} else {
					isError.value = false;
					error.value = '';
				}
			});
		};

		const params: FormItemType = {
			validate,
		};

		// 暴露方法 及 validaterItem
		useExpose({
			params,
		});

		onMounted(() => {
			if (props.prop) {
				// 监听 validate 事件
				// 在 input 组件中触发
				emitter.on('validate', () => {
					validate();
				});
				// 发送 formItem 事件
				// form 监听该事件
				// 完成进入数组
				emitBus.emit('formItem', params);
			}
		});

		const formItemProvide = reactive({
			...toRefs(props),
			emitter,
			validate,
		});

		// 通过 provide 注入 当前组件的 props 及方法
		provide('formItemProvide', formItemProvide);

		// label 属性
		const renderLabelAttr = () => {
			const attr: {
				for?: string;
			} = {};
			if (props.prop) attr.for = props.prop;
			return attr;
		};

		return () => (
			<>
				<div class={['form-item mb-6 flex', isError.value && itemStyles['is-error']]}>
					<label
						{...renderLabelAttr()}
						class={[
							'form-item__label flex text-gray-500 text-sm mb-1 justify-end items-center pr-3 dark:text-gray-300',
							(props.required || isRequired) && itemStyles['is-required'],
						]}
						style={{ width: props.labelWidth || '60px' }}
					>
						{props.label}
					</label>
					<div class='form-item__inner flex-1 relative transition-all duration-300'>
						{renderSlot(slots, 'default')}

						<Transition
							enterFromClass={itemStyles['fade-enter']}
							leaveToClass={itemStyles['fade-enter']}
							enterActiveClass={itemStyles['fade-active']}
							leaveActiveClass={itemStyles['fade-active']}
						>
							{isError.value ? (
								<span class='form-item__error absolute text-xs pt-0.5 text-themeerrorcolor-400'>
									{error.value}
								</span>
							) : null}
						</Transition>
					</div>
				</div>
			</>
		);
	},
});

export default FormItem;
