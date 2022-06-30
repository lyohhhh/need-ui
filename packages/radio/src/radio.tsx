import { computed, defineComponent, inject, Ref, renderSlot } from 'vue';
import { ProvideRadioKey } from './radio-group';
import { radioProps } from './radio-props';
import '../styles/radio.scss';

export default defineComponent({
	name: 'Radio',
	props: radioProps,
	emits: ['update:modelValue', 'change'],
	setup(props, { emit, slots }) {
		const injectValue = inject<Ref<string | number>>(ProvideRadioKey);

		const radioChange = (e: MouseEvent) => {
			emit('change', props.label);
			emit('update:modelValue', props.label);
			if (injectValue !== undefined && props.label) {
				injectValue.value = props.label;
			}
			e.stopPropagation();
			e.preventDefault();
		};

		const isCheckedClass = computed<string | null>(() => {
			const model = props.modelValue ? props.modelValue : injectValue ? injectValue.value : '';
			return props.label === model ? 'is-checked' : null;
		});

		return () => (
			<>
				<label
					class={['l-radio', isCheckedClass.value, 'inline-flex items-center mr-6 leading-none']}
					onClick={radioChange}
					area-checked={!!isCheckedClass.value}
				>
					<span
						class={['l-radio__input relative inline-flex items-center mr-2', isCheckedClass.value]}
					>
						<span class='l-radio__inner relative inline-block w-3.5 h-3.5 rounded-full border'></span>
						<input
							aria-hidden='true'
							type='radio'
							class='l-radio__original absolute -z-10 w-0 top-0 left-0 right-0 bottom-0 opacity-0'
							name={props.name}
							value={props.label}
						/>
					</span>

					<span class='l-radio__label text-sm text-gray-700'>{renderSlot(slots, 'default')}</span>
				</label>
			</>
		);
	},
});
