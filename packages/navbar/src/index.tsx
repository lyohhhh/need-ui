import { defineComponent, PropType, reactive } from 'vue';
import { go } from '@shared/index';
import side from '@shared/css/side.module.scss';

const Navbar = defineComponent({
	name: 'navbar',
	props: {
		category: {
			type: [] as PropType<Tree[]>,
			required: true,
		},
	},
	setup() {
		const slideBooleanList = reactive<boolean[]>([]);

		const slideShow = (i: number) => {
			for (let item of slideBooleanList) {
				item;
				item = false;
			}
			slideBooleanList[i] = true;
		};
		const slideHide = (i: number) => {
			slideBooleanList[i] = false;
		};

		return {
			slideShow,
			slideHide,
			slideBooleanList,
		};
	},
	render() {
		const main = createTree.call(this, this.category);
		return (
			<div>
				{/* <div class="side-nav-bar-masker absolute w-full h-full bg-black opacity-50 lg:hidden"></div> */}
				<div class='main'>
					<ul class='flex relative pr-6 '>{main}</ul>
				</div>
			</div>
		);
	},
});

function createTree(this: InstanceType<typeof Navbar>, tree: Tree[]): JSX.Element | null {
	if (!tree.length) return null;
	return (
		<>
			{tree.map((item, index) => {
				return (
					<li
						class={['py-4 px-2 cursor-pointer relative group group-hover md:px-4', side['group']]}
						onMouseover={this.slideShow.bind(this, index)}
						onMouseout={this.slideHide.bind(this, index)}
						onClick={e => go(e, item.url as string)}
					>
						<span
							class={[
								'text-sm inline-block border-themetextcolor-500 cursor-pointer box-border group-hover:border-b-2 dark:border-themetextcolor-300',
								item.children ? side['side-tips'] : null,
							]}
						>
							{item.name}
						</span>
						{item.children ? (
							<ul
								class={[
									'flex-col absolute top-3/4 mt-2 py-2 rounded-md bg-white left-1/2 -translate-x-1/2 border-gray-200 border dark:bg-themebgcolor-900 dark:border-themebgcolor-500',
									this.slideBooleanList[index] ? 'block' : 'hidden',
								]}
							>
								{item.children.map(c => (
									<li
										onClick={e => go(e, c.url as string)}
										class='whitespace-nowrap px-4 text-sm py-1.5 hover:text-themetextcolor-500 dark:hover:text-themetextcolor-300'
									>
										{c.name}
									</li>
								))}
							</ul>
						) : null}
					</li>
				);
			})}
		</>
	);
}

export default Navbar;
