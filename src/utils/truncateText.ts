export function truncateText(str: string, max = 50): string {
  return str.length > max ? str.slice(0, max) + "…" : str;
}
