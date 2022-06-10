import { Scroll } from '../components';
import { inject } from 'vue';

export default () => inject<typeof Scroll>('scroll') as any;
