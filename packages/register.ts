import { App } from 'vue';

type RegisterOptions = {
	prefix?: string;
	components?: any[];
};

type Instance = {
	prefix: string;
	install: (app: App) => void;
};

export function register({ prefix = '', components = [] }: RegisterOptions = {}): Instance {
	const Registered: App[] = [];

	function registerComponent(app: App, component: any, name: string): void {
		app.component(prefix + name, component);
	}

	function install(app: App): void {
		if (Registered.includes(app)) return;
		Registered.push(app);

		components.forEach(component => {
			const { name } = component;
			registerComponent(app, component, name);
		});
	}

	return {
		prefix,
		install,
	};
}
