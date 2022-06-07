import { defineComponent, PropType, ref, Teleport, Transition } from 'vue';

import { Masker } from '@/components';
import sideAnimate from '../styles/side.module.scss';
import side from '@shared/css/side.module.scss';

const Sidebar = defineComponent({
	name: 'Sidebar',
	props: {
		category: {
			type: [] as PropType<Tree[]>,
			required: true,
		},
		modelValue: {
			type: Boolean as PropType<boolean>,
		},
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const activedIndex = ref<number>(-1);

		const changeCollapse = (flag: boolean) => {
			emit('update:modelValue', flag);
		};

		const collapseSideByIndex = (index: number) => {
			activedIndex.value = index == activedIndex.value ? -1 : index;
		};

		return {
			changeCollapse,
			activedIndex,
			collapseSideByIndex,
		};
	},

	render() {
		const props = this.$props;
		return (
			<Teleport to='#app'>
				<Transition
					enterFromClass={sideAnimate['translate-enter']}
					leaveToClass={sideAnimate['translate-enter']}
					enterActiveClass={sideAnimate['translate-active']}
					leaveActiveClass={sideAnimate['translate-active']}
				>
					<aside
						class='fixed top-0 left-0 bottom-0 w-1/2 bg-white z-30 dark:bg-themebgcolor-900'
						v-show={props.modelValue}
					>
						<main class='side-main text-center h-full box-border pt-16'>
							<h1 class='text-2xl mb-8'>Title</h1>
							<ul>{renderCategory.call(this)}</ul>
						</main>
					</aside>
				</Transition>

				<Masker show={props.modelValue} onChange={this.changeCollapse}></Masker>
			</Teleport>
		);
	},
});

const renderCategory: (this: InstanceType<typeof Sidebar>) => JSX.Element = function (
	this: InstanceType<typeof Sidebar>
) {
	const props = this.$props;
	return (
		<>
			{props.category.map((item, index) => (
				<li
					class={[
						'py-2 relative group',
						side['group'],
						this.activedIndex == index && side['group-click'],
					]}
					onClick={this.collapseSideByIndex.bind(this, index)}
				>
					<span
						class={[
							'inline-block border-themetextcolor-300 border-opacity-0 border-b-2 py-2 text-sm',
							item.children ? side['side-tips'] : null,
							this.activedIndex == index && ' border-opacity-100',
						]}
					>
						{item.name}
					</span>

					{item.children ? (
						<ul
							class={[
								'h-0 overflow-hidden max-h-0 transition-all duration-300 ',
								this.activedIndex == index &&
									'bg-themebgcolor-100 py-4 dark:bg-themebgcolor-800 h-auto max-h-48',
							]}
						>
							{item.children.map(c => (
								<li class='text-xs leading-10 cursor-pointer'>{c.name}</li>
							))}
						</ul>
					) : null}
				</li>
			))}
		</>
	);
};

export default Sidebar;
