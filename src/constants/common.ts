import { format } from "date-fns";

const OLDEST_DATE = format(new Date('2000-01-01'), 'yyyy-MM-dd');
const TODAY = format(new Date(), 'yyyy-MM-dd');

const DISCOUNT_UNIT_TYPE = {
	FIXED_RATE: '%',
	FLAT_RATE: '원',
} as const;

export {
	OLDEST_DATE,
	TODAY,
	DISCOUNT_UNIT_TYPE,
}