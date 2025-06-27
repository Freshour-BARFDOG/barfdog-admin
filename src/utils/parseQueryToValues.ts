export function parseQueryToValues<T extends Record<string, any>>(params: URLSearchParams, defaults: T): T {
	const result: any = { ...defaults };

	Object.entries(defaults).forEach(([key, defaultValue]) => {
		const param = params.get(key);
		if (param !== null) {
			result[key] = Array.isArray(defaultValue) ? param.split(",") : param;
		}
	});

	return result;
}