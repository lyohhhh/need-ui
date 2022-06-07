import { defineComponent, PropType } from 'vue';

import list from '../styles/list.module.scss';

export interface Props {
	id: number;
	title: string;
	content: string;
	time: string;
	author: string;
	img?: string;
}

export default defineComponent({
	name: 'List',
	props: {
		list: {
			type: [] as PropType<Props[]>,
			default: () => [],
		},
	},
	setup(props, { emit }) {
		const click = (...args: any[]) => {
			emit('click', args);
		};
		return { click };
	},
	render() {
		return (
			<ul class='article-list divide-y shadow-sm divide-gray-200 overflow-hidden dark:divide-gray-700'>
				{this.$props.list.map(item => (
					<li
						class='article-item group p-5 cursor-pointer hover:bg-themebgcolor-50 dark:hover:bg-themebgcolor-800 dark:hover:bg-opacity-75'
						onClick={this.click}
					>
						<p class='article-title text-md font-medium mb-2 truncate group-hover:underline dark:text-gray-400 md:text-xl'>
							{item.title}
						</p>
						<div class='article-content flex text-sm text-gray-500 leading-6 mt-2 md:text-md dark:text-gray-400 md:leading-7'>
							<span class='inline-block ov-2 md:ov-3'>{item.content}</span>
							{item.id % 3 ? (
								<div
									class={[
										'w-1/6 min-w-min h-8 ml-2 md:ml-6 overflow-hidden rounded-sm md:rounded-md',
										list['image-wrapper'],
									]}
								>
									<img
										src={item.img}
										class='max-h-full transition-all group-hover:scale-110'
										alt=''
									/>
								</div>
							) : null}
						</div>
						<div class='article-footer flex align-middle text-sm mt-4 text-gray-500 md:text-md'>
							<span>{item.time}</span>
						</div>
					</li>
				))}
			</ul>
		);
	},
});
