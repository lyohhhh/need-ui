import { Scroll } from '@/components/scroll';
import { inject } from 'vue';

export default () => inject<typeof Scroll>('scroll') as any;
