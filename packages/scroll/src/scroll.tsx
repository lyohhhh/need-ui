import { stopDefault } from '../../[shared]/mouse';
import { useExpose } from '../../_hooks/useExpose';
import { throttle } from '../../_utils';
import { defineComponent, nextTick, onMounted, reactive, ref, renderSlot, toRefs } from 'vue';
import scrollStyles from '../styles/scroll.module.scss';

type ScrollType<T = any> = {
	wrap?: T;
	main?: T;
	barSlot?: T;
	barThumb?: T;
	wrapHeight: number;
	mainHeight: number;
	barThumbHeight: string;
	scrollY: string;
	maxScrollY: number;
	startY: number;
};

export default defineComponent({
	name: 'Scroll',
	props: {
		height: {
			type: String,
			default: '100vh',
		},
		slotColor: {
			type: String,
			default: 'transparent',
		},
		class: {
			type: String,
			default: '',
		},
	},

	setup() {
		// 是否移动
		// 及 是否可以复制内容
		const isMove = ref<boolean>(false);
		const scroll = reactive<ScrollType>({
			wrap: undefined,
			main: undefined,
			barSlot: undefined,
			barThumb: undefined,
			wrapHeight: 0,
			mainHeight: 0,
			barThumbHeight: '0%',
			scrollY: '0',
			maxScrollY: 0,
			startY: 0,
		});

		/**
		 * 页面加载完成 重置 scroll
		 */
		onMounted(() => {
			resetScroll();
		});

		/**
		 * @description 获取当前页面滚动的距离
		 * @returns { x: number, y: number} x轴， y轴
		 */
		const getScroll = () => {
			const { wrap } = scroll;
			return {
				x: 0,
				y: wrap?.scrollTop,
			};
		};
		/**
		 * 重置 scroll
		 * scroll view 高度变化
		 *  -> 列表分页 加载更多列表
		 * 将 resetScroll 抛出
		 */
		const resetScroll = () => {
			const { wrap, main } = scroll;
			scroll.wrapHeight = wrap?.clientHeight || 0;
			scroll.mainHeight = main?.clientHeight || 0;
			/**
			 * 重置 scrollthumb 高度
			 *  -> 可见高度 / 页面高度 * 100
			 *  -> 百分比
			 */
			const rate = (scroll.wrapHeight / scroll.mainHeight) * 100;
			scroll.barThumbHeight = `${rate >= 100 ? 0 : rate}%`;

			/**
			 * nextTick 之后
			 * 设置滚动槽的最大边界
			 *  -> ( 滚动槽高度 - 滚动条高度 ) /  滚动条高度 * 100
			 *  -> 百分比 （ 通过 transform translateY(百分比)） 控制
			 */
			nextTick(() => {
				const { slotHeight, thumbHeight } = getValue();
				if (thumbHeight != 0) {
					scroll.maxScrollY = ((slotHeight - thumbHeight) / thumbHeight) * 100;
				}
			});
		};

		/**
		 * @description 设置滚动槽滚动距离
		 * @description 及设置 transform translateY(百分比)
		 * @param top 距离顶部距离
		 * @param dot 单位
		 */
		const setScrollY = (top: number, dot = '%') => {
			scroll.scrollY = `${top}${dot}`;
		};

		/**
		 * @description 公共方法 获取共用参数
		 * @returns scrollTop,slotHeight,thumbHeight,mainHeight,
		 */
		const getValue = () => {
			const { wrap, mainHeight, barSlot, barThumb } = scroll;
			const scrollTop = wrap?.scrollTop || 0,
				slotHeight = barSlot?.clientHeight || 0,
				thumbHeight = barThumb?.clientHeight || 0;

			/**
			 * 可见容器的滚动高度
			 * 滚动槽高度
			 * 滚动条高度
			 * 页面高度
			 */
			return {
				scrollTop,
				slotHeight,
				thumbHeight,
				mainHeight,
			};
		};

		const computedScrollYBySlot = (): number => {
			// 获取到需要的参数
			const { scrollTop, mainHeight, slotHeight, thumbHeight } = getValue();
			/**
			 * 计算滚动条滚动高度
			 * ( 可见容器的滚动高度 / 页面高度) * 滚动槽高度 / 滚动条高度 * 100
			 * -> 百分比
			 */
			const scrollYVal = (((scrollTop / mainHeight) * slotHeight) / thumbHeight) * 100;

			return scrollYVal;
		};

		/**
		 * 页面滚动事件
		 * 通过节流函数优化 60HZ
		 */
		const scrollEvent = throttle(
			() => {
				const scrollYVal = computedScrollYBySlot();
				/**
				 * 调用函数 设置 translate
				 */
				setScrollY(scrollYVal);
			},
			60 / 1000,
			true
		);

		/**
		 * 点击滚动槽位置 滚动到指定距离
		 */
		const scrollToBySlot = (e: MouseEvent) => {
			e.stopPropagation();
			e.preventDefault();
			const y = e.clientY;
			const { thumbHeight, mainHeight, slotHeight } = getValue();
			/**
			 * 设置滚动条高度
			 * ( 点击距离 - 滚动条高度 / 2 ) / 滚动条高度 * 100
			 * -> 百分比
			 */
			const barScrollTop = ((y - thumbHeight / 2) / thumbHeight) * 100;

			/**
			 * 判断边界情况
			 *  < 0 = 0
			 *  > maxScrollY = maxScrollY
			 */
			setScrollY(
				barScrollTop < 0 ? 0 : barScrollTop > scroll.maxScrollY ? scroll.maxScrollY : barScrollTop
			);
			if (scroll.wrap) {
				/**
				 * 主体视窗 同步滚动
				 * ( 点击距离 / 滚动条高度 ) * 页面高度 - 容器可见高度
				 */
				scroll.wrap.scrollTo(0, (y / slotHeight) * mainHeight - scroll.wrap.clientHeight);
			}
		};

		/**
		 * 拖动滚动条时 记录点击位置
		 * Tip : 需要将已经滚动过的位置减去
		 * 防止清空之前滚动的距离
		 */
		const setStartY = (e: MouseEvent) => {
			// 获取到 滚动过的距离
			const scrollY = +scroll.scrollY.replace('%', '') / 100 || 0;
			const { thumbHeight } = getValue();
			/**
			 * 点击位置 - 滚动过的距离 * 滚动条高度
			 */
			scroll.startY = e.clientY - scrollY * thumbHeight;
			// 设置可拖动状态
			setMoveStatus(true);
		};

		/**
		 * 设置可拖动状态
		 */
		const setMoveStatus = (move: boolean) => {
			// 同步到 isMove 变量
			isMove.value = move;
			/**
			 * 可拖动
			 * 监听 window mousemove 防止用户 将鼠标移出滚动条
			 * 监听 window mouseup
			 * 		-> 鼠标抬起 设置可拖动状态为false
			 * 		-> 移除 window mousemove
			 */
			if (isMove.value) {
				window.addEventListener('mousemove', moveByMouse);
				window.addEventListener('mouseup', () => {
					isMove.value = false;
					window.removeEventListener('mousemove', moveByMouse);
				});
			}
		};

		/**
		 * 具体拖动方法
		 */
		const moveByMouse = throttle(
			(e: MouseEvent) => {
				// 不是可拖动状态
				if (!isMove.value) return;
				stopDefault(e);
				const { startY, barSlot } = scroll;
				const { thumbHeight } = getValue();

				/**
				 * 设置滚动条的滚动距离
				 * ( 滚动距离 - 记录点击距离 ) / 滚动条高度
				 */
				const scrollYVal = (e.clientY - startY) / thumbHeight;

				/**
				 * 设置 translate
				 * 判断边界情况
				 *  < 0 = 0
				 *  > maxScrollY = maxScrollY
				 * 百分比 : 百分比
				 */
				setScrollY(
					scrollYVal < 0
						? 0
						: scrollYVal * 100 > scroll.maxScrollY
						? scroll.maxScrollY
						: scrollYVal * 100
				);
				if (scroll.wrap) {
					/**
					 * 设置主视窗滚动
					 * ( 滚动槽滚动距离_百分比 * 滚动调高度) / 滚动槽高度 * 页面高度
					 */
					scroll.wrap.scrollTo(
						0,
						((scrollYVal * thumbHeight) / (barSlot?.clientHeight || 0)) *
							(scroll.main?.clientHeight || 0)
					);
				}
			},
			60 / 1000,
			true
		);
		/**
		 * @description 根据百分比 获取应该滚动多少 px
		 * @returns { scrollTop } 滚动多少位置 px
		 */
		const getScrollTopByPercentage = (percentage: number): number => {
			const { mainHeight, wrapHeight } = scroll;
			/**
			 * 需要将可视窗口减去
			 */
			const scrollTop = (percentage / 100) * mainHeight - wrapHeight / 2;
			return scrollTop;
		};

		/**
		 * 滚动页面的位置 同 Event ScrollTop
		 * 滚动滚动条 与 页面主体内容
		 */
		function scrollTo(x: number, y: number): void;
		function scrollTo(x: string, y: string): void;
		function scrollTo(x: any, y: any) {
			if (typeof x === 'string' && typeof y === 'string') {
				try {
					if (!y.includes('%') && +y) {
						console.warn('The number defaults to percentages');
					}
					const dot = +y.replace(/%/g, '');
					if (isNaN(dot)) {
						throw new Error('Y must be a percentage if it is string');
					} else {
						const scrollTop = getScrollTopByPercentage(dot);
						setScrollY(dot);
						scroll.wrap?.scrollTo(+x, scrollTop);
					}
				} catch (e: unknown extends Error ? Error : any) {
					console.error(e.message);
				}
			} else {
				scroll.wrap?.scrollTo(x, y);
				const scrollYVal = computedScrollYBySlot();
				/**
				 * 调用函数 设置 translate
				 */
				setScrollY(scrollYVal);
			}
		}

		/**
		 * Vue3
		 * 暴露方法
		 */
		useExpose({
			resetScroll,
			scrollTo,
			getScroll,
		});

		return {
			...toRefs(scroll),
			scrollEvent,
			scrollToBySlot,
			setMoveStatus,
			moveByMouse,
			setStartY,
			isMove,
		};
	},
	render() {
		const props = this.$props;
		return (
			<>
				<div class={['l-scroll--wrapper group relative', this.isMove && 'select-none']}>
					<div
						class={['l-scroll--main w-full overflow-auto', props.class]}
						ref='wrap'
						style={{ height: props.height }}
						onScroll={this.scrollEvent}
					>
						<div class='l-scroll--main__view' ref='main'>
							{renderSlot(this.$slots, 'default')}
						</div>
					</div>
					<div
						class='l-scroll--bar is-vertical absolute right-0.5 top-1 bottom-1 text-right'
						ref='barSlot'
						onClick={this.scrollToBySlot}
					>
						<div
							class={[
								'l-scroll--bar__thumb rounded-md w-2 bg-gray-300 active:bg-gray-400 hover:bg-gray-400 inline-block cursor-pointer opacity-0 group-hover:opacity-100 dark:bg-gray-800 dark:active:bg-gray-900 dark:hover:bg-gray-900',
								scrollStyles['transition'],
							]}
							ref='barThumb'
							onClick={stopDefault}
							onMousedown={this.setStartY}
							onMouseup={this.setMoveStatus.bind(this, false)}
							style={{
								height: this.barThumbHeight,
								transform: `translateY(${this.scrollY})`,
							}}
						></div>
					</div>
				</div>
			</>
		);
	},
});
