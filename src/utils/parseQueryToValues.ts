export function parseQueryToValues<T extends Record<string, any>>(
  params: URLSearchParams,
  defaults: T
): T {
  const result: any = { ...defaults };

  Object.entries(defaults).forEach(([key, defaultValue]) => {
    const param = params.get(key);
    if (param !== null) {
      // statusList 키만 특별히 배열로 처리
      if (key === "statusList") {
        result[key] = param.split(",") as any; // ["PRODUCING"] 형태
      } else if (Array.isArray(defaultValue)) {
        result[key] = param.split(",");
      } else {
        result[key] = param;
      }
    }
  });

  return result;
}
