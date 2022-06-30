import { defineComponent, provide, ref, renderSlot } from 'vue';
import props from './form-props';
import { Validate, FormItem, key } from '../../[shared]';
import { emitter } from '../../[shared]/emitter';
import formStyle from '../styles/form.module.scss';
import { useExpose } from '../../_hooks/useExpose';

const Form = defineComponent({
	name: 'Form',
	props,
	setup(props, { slots }) {
		const items = ref<FormItem[]>([]);

		/**
		 * 对每个 item 进行效验
		 */
		const validate = (cb: Validate) => {
			const tasks = items.value.map(item => item.validate());
			Promise.all(tasks)
				.then(() => {
					cb(true);
				})
				.catch(() => {
					cb(false);
				});
		};
		// 监听 formItem 事件
		// 将当前 formItem 添加到数组中
		// 通过 validate 对每个 item 进行 效验
		emitter.on('formItem', item => {
			items.value.push(item);
		});
		if (props.model) {
			// 注入当前的绑定的数据
			// 以及当前的规则
			provide(key, {
				model: props.model,
				rules: props.rules,
			});
		}

		// 暴露验证方法
		useExpose({
			validate,
		});

		return () => (
			<form class={['l-form', props.inline && formStyle['form__inline']]}>
				{renderSlot(slots, 'default')}
			</form>
		);
	},
});

export default Form;
