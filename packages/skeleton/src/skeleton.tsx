import { useResize } from '@/hooks/useResize';
import { defineComponent, PropType, renderSlot } from 'vue';

const isMobile = useResize();

export default defineComponent({
	name: 'Skeleton',
	props: {
		rows: {
			type: Number as PropType<number>,
			default: isMobile.value ? 2 : 3,
		},
		rowWidth: {
			type: [Array, Number, String] as PropType<Array<number | string> | number | string>,
			default: '100%',
		},
		items: {
			type: Number as PropType<number>,
			default: 1,
		},
		title: {
			type: Boolean,
			default: true,
		},
		image: {
			type: Boolean,
			default: false,
		},
		loading: {
			type: Boolean,
			default: false,
		},
		time: {
			type: Boolean,
			default: true,
		},
	},
	render() {
		const props = this.$props;

		const renderTitle = () => {
			return props.title ? (
				<div class='skeletion-item bg-gray-100 h-4 mb-4 md:h-6 md:mb-6 dark:bg-themebgcolor-500'></div>
			) : null;
		};

		const renderContent = () => {
			return new Array(props.rows)
				.fill(1)
				.map((r, index) => (
					<div
						class='skeletion-item bg-gray-100 h-3 mb-4 md:h-4 md:mb-4 dark:bg-themebgcolor-500'
						style={{ width: getPropsWidth(props.rowWidth, index) }}
					></div>
				));
		};

		const renderImage = () => {
			return props.image ? (
				<div class='skeleton-image__wrapper'>
					<div class='skeleton-image w-24 ml-4 h-10 bg-gray-100 md:w-44 md:h-20 md:ml-6 dark:bg-themebgcolor-500'></div>
				</div>
			) : null;
		};

		const renderTime = () => {
			return props.time ? (
				<div class='skeletion-item bg-gray-100 h-2 w-28 mt-1 md:h-3 md:mt-2 dark:bg-themebgcolor-500'></div>
			) : null;
		};

		return (
			<>
				{props.loading
					? new Array(props.items).fill(1).map(() => (
							<div class='skeleton p-4 animate-pulse'>
								{renderTitle()}
								<div class='skeleton-content flex'>
									<div class='skeleton-main flex-1'>{renderContent()}</div>
									{renderImage()}
								</div>
								{renderTime()}
							</div>
					  ))
					: renderSlot(this.$slots, 'default')}
			</>
		);
	},
});

const getPropsWidth = (
	rowWidth: string | number | Array<number | string>,
	index: number
): string => {
	let width = '100%';
	if (typeof rowWidth === 'string') {
		width = rowWidth;
	}
	if (typeof rowWidth === 'number') {
		width = rowWidth + 'px';
	}

	if (Array.isArray(rowWidth)) {
		width = rowWidth[index] ? getPropsWidth(rowWidth[index], index) : '100%';
	}
	return width;
};
