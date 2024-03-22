export class MyCache<T extends Record<string, unknown>> {
	private cache = new Map<keyof T, T[keyof T]>();

	get(key: keyof T) {
		return this.cache.get(key);
	}

	add(key: keyof T, value: T[keyof T]) {
		this.cache.set(key, value);
	}

	delete(keys: Array<keyof T>) {
		keys.forEach(key => {
			this.cache.delete(key);
		});
	}

	deleteAll() {
		this.cache.clear();
	}
}
