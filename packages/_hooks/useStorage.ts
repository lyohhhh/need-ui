class LocalCacheStorage {
	setStorage(key: string, value: any) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	getStorage(key: string): string {
		let value = localStorage.getItem(key) ?? '';
		try {
			value = JSON.parse(value);
		} catch (e) {
			console.log(e);
			value = '';
		}
		return value;
	}

	removeStorage(key: string) {
		localStorage.removeItem(key);
	}

	clearStorage() {
		localStorage.clear();
	}
}

export default new LocalCacheStorage();
