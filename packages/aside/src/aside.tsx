import { defineComponent, ref } from 'vue';

import { Skeleton } from '@/components';

export default defineComponent({
	name: 'RAside',
	setup() {
		const loading = ref<boolean>(true);

		return () => (
			<div class='aside p-2 shadow-lg flex-1 w-3/12 ml-10 bg-white rounded-md box-border sticky h-128 top-8 dark:bg-themebgcolor-900 dark:shadow-themebgcolor-700 hidden lg:block'>
				<Skeleton loading={loading.value} items={3} title={false} time={false}>
					11
				</Skeleton>
			</div>
		);
	},
});
