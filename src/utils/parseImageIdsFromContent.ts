export function parseImageIdsFromContent (html: string): number[] {
	// #id=숫자# 형태로 src 안에 포함된 ID들 추출
	const regex = /#id=(\d+)#/g;
	const ids = [];
	let match;
	while ((match = regex.exec(html)) !== null) {
		ids.push(Number(match[1]));
	}
	return ids;
};
