import type { Type } from '@/[shared]';
import { LIcon } from '../../components';
import { computed, defineComponent, PropType, renderSlot } from 'vue';
import '../styles/link.scss';
export default defineComponent({
	props: {
		type: {
			type: String as PropType<Type>,
			default: 'default',
		},
		underline: {
			type: Boolean,
			default: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		href: String,
		icon: String,
	},

	setup(props, { slots }) {
		const cls = computed<string>(() => {
			const classList: string[] = [];
			classList.push(`l-link--${props.type}`);
			if (props.underline) classList.push(`is-underline`);
			if (props.disabled) classList.push(`is-disabled`);
			return classList.join(' ');
		});
		return () => (
			<>
				<a href={props.href} class={['l-link', cls.value]}>
					<span class='l-link--inner'>
						{props.icon ? <LIcon icon={props.icon}></LIcon> : null}
						{renderSlot(slots, 'default')}
					</span>
				</a>
			</>
		);
	},
});
