import { getCurrentInstance, Ref, SetupContext } from 'vue';
import { dialogEmits, dialogProps } from './dialogContent';

export const useDialog = (props: typeof dialogProps, targetRef: Ref<HTMLElement | undefined>) => {
	const instance = getCurrentInstance()!;
	const emit = instance.emit as SetupContext<typeof dialogEmits>['emit'];
};
