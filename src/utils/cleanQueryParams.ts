export function cleanQueryParams(params: Record<string, any>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) =>
        value !== '' &&
        value !== null &&
        !(Array.isArray(value) && value.length === 0)
    ).map(([key, value]) => [key, String(value)])
  );
}
