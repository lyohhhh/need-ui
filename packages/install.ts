import * as components from './components';
import { register } from './register';

export default register({
	prefix: 'L',
	components: Object.keys(components).map(key => components[key as keyof typeof components]),
});
