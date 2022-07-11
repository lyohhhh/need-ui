import { computed, defineComponent, inject, renderSlot } from 'vue';
import { checkboxProps } from './checkbox-props';
import '../styles/checkbox.scss';
import { LIcon } from '../../components';
import {
	ProvideCheckboxBorder,
	ProvideCheckboxDisabled,
	ProvideCheckboxKey,
	type ModelValue,
} from './checkbox-group';

export default defineComponent({
	name: 'Checkbox',
	props: checkboxProps,
	emits: ['update:modelValue', 'change'],
	setup(props, { slots, emit }) {
		const injectValue = inject<ModelValue>(ProvideCheckboxKey);

		const groupDisabled = inject<boolean>(ProvideCheckboxDisabled);

		const groupBorder = inject<boolean>(ProvideCheckboxBorder);

		const checkboxChange = (e: MouseEvent) => {
			if (props.disabled || groupDisabled) return;
			const isChecked = isCheckedByGroup();
			const emitArguments = injectValue ? !isChecked : !props.modelValue;

			emit('change', emitArguments);
			emit('update:modelValue', emitArguments);
			if (injectValue !== undefined && props.label) {
				if (injectValue.value.includes(props.label)) {
					let index = injectValue.value.findIndex(item => item === props.label);
					injectValue.value.splice(index, 1);
				} else {
					injectValue.value.push(props.label);
				}
			}
			e.stopPropagation();
			e.preventDefault();
		};
		const isCheckedClass = computed<string | null>(() => {
			const model = props.modelValue ? props.modelValue : isCheckedByGroup();
			return model ? 'is-checked' : null;
		});

		const classs = computed<string>(() => {
			const classList = [];
			if (props.disabled || groupDisabled) classList.push('is-disabled');
			if (props.border || groupBorder) classList.push('is-border');
			if (props.indeterminate) classList.push('is-indeterminate');
			return classList.join(' ');
		});

		const isCheckedByGroup = (): boolean => {
			return !!(injectValue && injectValue?.value?.includes(props.label || ''));
		};

		const isShowIcon = computed<boolean>(() => {
			return props.modelValue || props.indeterminate || isCheckedByGroup();
		});
		return () => (
			<>
				<label
					class={[
						'l-checkbox',
						isCheckedClass.value,
						classs.value,
						'inline-flex cursor-pointer select-none items-center mr-6 leading-none rounded',
					]}
					onClick={checkboxChange}
					area-checked={!!isCheckedClass.value}
				>
					<span class={['l-checkbox__input relative inline-flex items-center mr-2']}>
						<span class='l-checkbox__inner relative inline-block w-3.5 h-3.5 rounded-sm border border-gray-300'>
							{isShowIcon.value ? (
								<LIcon
									icon={props.indeterminate === true ? 'henggang' : 'queren'}
									class='absolute text-white inline-block box-border text-xs p-0.5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
								></LIcon>
							) : null}
						</span>
						<input
							aria-hidden='true'
							type='checkbox'
							class='l-checkbox__original absolute -z-10 w-0 top-0 left-0 right-0 bottom-0 opacity-0'
							value={props.value || props.label}
						/>
					</span>

					<span class='l-checkbox__label text-sm text-gray-600'>
						{renderSlot(slots, 'default')}
					</span>
				</label>
			</>
		);
	},
});
