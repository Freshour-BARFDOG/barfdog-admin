const ARTICLE_CATEGORY = {
	NUTRITION: '영양',
	HEALTH: '건강',
	LIFE: '생애',
} as const;

const ARTICLE_CATEGORY_LIST = (Object.entries(ARTICLE_CATEGORY)).map(
	([value, label]) => ({ label, value })
);

export {
	ARTICLE_CATEGORY,
	ARTICLE_CATEGORY_LIST,
}