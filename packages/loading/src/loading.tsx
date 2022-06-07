import { defineComponent, onMounted, ref, renderSlot } from 'vue';
import props from './props';
import { ScrollObserver } from './observer';

export default defineComponent({
	name: 'LoadingMore',
	props,
	setup(props, { emit }) {
		const obs = ref<HTMLElement>();

		onMounted(() => {
			const observer = new ScrollObserver({
				root: null,
				obs: obs.value as HTMLElement,
				load() {
					if (!props.loading) {
						emit('load');
					}
					if (props.finished) {
						observer.cancelObserver();
					}
				},
			});
		});
		return {
			obs,
		};
	},

	render() {
		const props = this.$props;
		return (
			<>
				{renderSlot(this.$slots, 'default')}

				<div
					ref='obs'
					class='leading-loose text-center text-sm py-4 text-gray-600 dark:text-gray-500'
				>
					{props.finished ? props.finishedText : props.loadingText}
				</div>
			</>
		);
	},
});
