import { format } from "date-fns";

const OLDEST_DATE = format(new Date('2000-01-01'), 'yyyy-MM-dd');
const TODAY = format(new Date(), 'yyyy-MM-dd');

const DISCOUNT_UNIT_TYPE = {
	FIXED_RATE: '%',
	FLAT_RATE: '원',
} as const;

const DISCOUNT_UNIT_TYPE_LIST = Object.entries(DISCOUNT_UNIT_TYPE).map(([value, label]) => ({label, value}));

const UNLIMITED_VALUE = 99999;

export {
	OLDEST_DATE,
	TODAY,
	DISCOUNT_UNIT_TYPE,
	DISCOUNT_UNIT_TYPE_LIST,
	UNLIMITED_VALUE,
}
