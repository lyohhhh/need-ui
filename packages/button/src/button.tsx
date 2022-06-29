import { LIcon } from '../../components';
import { computed, defineComponent, PropType, renderSlot } from 'vue';
import '../styles/button.scss';
import type { Type, Size } from '@/[shared]';

export default defineComponent({
	name: 'Button',
	props: {
		size: {
			type: String as PropType<Size>,
			default: 'sm',
		},
		type: {
			type: String as PropType<Type>,
			default: 'default',
		},
		plain: {
			type: Boolean,
			default: false,
		},
		round: {
			type: Boolean,
			default: false,
		},
		circle: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		loading: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['click'],
	setup(props, { emit }) {
		/**
		 * 通过 props 计算统一样式
		 */
		const buttonClass = computed(() => {
			const classByProps: string[] = [];
			classByProps.push(`button--${props.type}`);
			classByProps.push(`button--${props.size}`);
			if (props.disabled) classByProps.push('is-disabled');
			if (props.loading) classByProps.push('is-loading');
			if (props.circle) classByProps.push('is-circle');
			return classByProps.join(' ');
		});

		/**
		 * 绑定 Click 事件， 将参数传递
		 */
		const emitClick = (...args: any[]) => {
			if (props.loading || props.disabled) return;
			emit('click', args);
		};

		return { buttonClass, emitClick };
	},
	render() {
		const props = this.$props;
		return (
			<button class={['l-button', this.buttonClass]} onClick={this.emitClick}>
				<span>
					{renderSlot(this.$slots, 'default')}
					{/* 判断是否是loading */}
					{props.loading && <LIcon icon='loading'></LIcon>}
				</span>
			</button>
		);
	},
});
