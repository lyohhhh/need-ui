import { defineComponent, renderSlot } from 'vue';
export default defineComponent({
	name: 'Footer',

	render() {
		return (
			<>
				<footer class='footer fixed shadow-top-md left-0 right-0 bottom-0 h-16 bg-white dark:shadow-themebgcolor-700 dark:bg-themebgcolor-900'>
					{renderSlot(this.$slots, 'default')}
				</footer>
			</>
		);
	},
});
