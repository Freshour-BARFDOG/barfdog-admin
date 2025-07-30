import { format, startOfToday } from "date-fns";
import { toLabelValueList } from "@/utils/toLabelValueList";
import { themeVars } from "@/styles/theme.css";

const STATS_INITIAL_SEARCH_VALUES = {
	from: format(startOfToday(), "yyyy-MM-dd-HH-mm"),
	to: format(new Date(), "yyyy-MM-dd-HH-mm"),
	graphInterval: 'day',
} as const;

const GRAPH_INTERVAL = {
	day: '일별',
	month: '월별',
	year: '연도별',
} as const;

const GRAPH_INTERVAL_LIST = toLabelValueList(GRAPH_INTERVAL);

const DELIVERY_STATUS = {
	DELIVERY_BEFORE_COLLECTION: '배송 예정',
	DELIVERY_START: '배송 중',
	DELIVERY_DONE: '배송 완료',
} as const;

const CHART_COLORS = [
	themeVars.colors.red.pastelRed, themeVars.colors.red.lightRed, themeVars.colors.yellow.yellow500, themeVars.colors.blue.blue400, themeVars.colors.green.green500,
	themeVars.colors.red.pastelPink, themeVars.colors.yellow.yellow400, themeVars.colors.blue.blue500, themeVars.colors.green.green300, themeVars.colors.blue.blue300,
];

const ORDER_COUNT_LABEL = {
	newSubscribeCount: '신규 구독 결제',
	totalSubscribeCount: '총 구독 결제',
	generalOrderCount: '일반결제',
} as const;

const MEMBER_COUNT_LABEL = {
	newMemberCount: '신규 회원',
} as const;

const SALES_COUNT_LABEL = {
	generalOrderSalesCount: '일반',
	subscribeSalesCount: '구독',
	totalSalesCount: '전체',
} as const;

const BAR_CHART_COLOR = {
	first: themeVars.colors.chart.blue,
	second: themeVars.colors.chart.orange,
	third: themeVars.colors.gray.gray400,
}

export {
	STATS_INITIAL_SEARCH_VALUES,
	GRAPH_INTERVAL,
	GRAPH_INTERVAL_LIST,
	DELIVERY_STATUS,
	CHART_COLORS,
	ORDER_COUNT_LABEL,
	MEMBER_COUNT_LABEL,
	SALES_COUNT_LABEL,
	BAR_CHART_COLOR,
}
