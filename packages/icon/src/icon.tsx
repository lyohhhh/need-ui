import { defineComponent } from 'vue';
import '../styles/icon.css';

export default defineComponent({
	name: 'Icon',
	props: {
		icon: {
			type: String,
			required: true,
		},
		styles: {
			type: String,
			required: false,
		},
	},
	emits: ['click'],
	setup(props, { emit }) {
		const emitClick = (...args: any[]) => {
			emit('click', args);
		};
		return () => (
			<i onClick={emitClick} class={['l-icon iconfont', `l-${props.icon}`, props.styles]}></i>
		);
	},
});
