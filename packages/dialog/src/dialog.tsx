import { LMasker, LButton } from '../../components';
import { defineComponent, renderSlot, Teleport, Transition } from 'vue';

import dialogAnimate from '../styles/dialog.module.scss';

export default defineComponent({
	name: 'Dialog',
	props: {
		title: {
			type: String,
			default: '提示',
		},
		showCancel: {
			type: Boolean,
			default: true,
		},
		closeOnModal: {
			type: Boolean,
			default: false,
		},
		top: {
			type: String,
			default: '10vh',
		},
		cancelLoading: {
			type: Boolean,
			default: false,
		},
		confirmLoading: {
			type: Boolean,
			default: false,
		},
		cancelDisabled: {
			type: Boolean,
			default: false,
		},
		confirmDisabled: {
			type: Boolean,
			default: false,
		},
		modelValue: {
			type: Boolean,
			default: false,
		},
		center: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['confirm', 'cancel', 'update:modelValue'],
	setup(props, { emit }) {
		const hideDialog = () => {
			emit('update:modelValue', false);
		};

		const emitConfirm = () => {
			emit('confirm');
			hideDialog();
		};

		const emitCancel = () => {
			emit('cancel');
			hideDialog();
		};

		return { hideDialog, emitConfirm, emitCancel };
	},
	render() {
		return (
			<Teleport to='body'>
				<Transition
					enterFromClass={dialogAnimate['fade-enter']}
					leaveToClass={dialogAnimate['fade-enter']}
					enterActiveClass={dialogAnimate['fade-active']}
					leaveActiveClass={dialogAnimate['fade-active']}
				>
					{this.modelValue ? (
						<div
							class='dialog fixed bg-white rounded-md w-72 left-1/2 -translate-x-2/4 z-30 md:w-6/12 lg:w-4/12 dark:bg-themebgcolor-800'
							style={{ top: this.top }}
						>
							<div class='dialog-title text-center p-4 text-lg font-semibold dark:text-themebgcolor-300'>
								{this.$slots.title ? renderSlot(this.$slots, 'title') : '提示'}
							</div>
							<div class='dialog-content px-4'>
								{this.$slots.default ? renderSlot(this.$slots, 'default') : 'content'}
							</div>
							<div class='dialog-footer p-4'>
								<div class={['flex items-center', this.center ? 'justify-center' : 'justify-end']}>
									{this.$slots.footer ? (
										renderSlot(this.$slots, 'footer')
									) : (
										<>
											{this.showCancel && (
												<LButton
													loading={this.cancelLoading}
													disabled={this.cancelDisabled}
													onClick={this.emitCancel}
												>
													取消
												</LButton>
											)}
											<LButton
												loading={this.confirmLoading}
												disabled={this.confirmDisabled}
												onClick={this.emitConfirm}
												type='primary'
											>
												确定
											</LButton>
										</>
									)}
								</div>
							</div>
						</div>
					) : null}
				</Transition>
				<LMasker
					show={this.modelValue}
					onChange={() => {
						this.closeOnModal ? this.hideDialog : null;
					}}
				></LMasker>
			</Teleport>
		);
	},
});
