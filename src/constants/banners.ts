
const BANNER_STATUS = {
	LEAKED: 'Y',
	HIDDEN: 'N',
} as const;


const BANNER_STATUS_LIST = (Object.entries(BANNER_STATUS)).map(
	([value, label]) => ({ label, value })
);


export {
	BANNER_STATUS,
	BANNER_STATUS_LIST,
}