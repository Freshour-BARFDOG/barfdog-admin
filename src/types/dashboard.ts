import { GRAPH_INTERVAL } from "@/constants/dashboard";
import { SUBSCRIBE_STATUS } from "@/constants/subscribe";
import { OrderStatus } from "@/types/sales";
import { Plan } from "@/types/subscribe";

type GraphIntervalType = keyof typeof GRAPH_INTERVAL;

interface StatsSearchParams {
	from: string;
	to: string;
	graphInterval: GraphIntervalType;
}

interface BaseStat {
	count: number;
}

interface DeliveryStatusStat extends BaseStat {
	deliveryStatus: OrderStatus;
}

interface GeneralOrderStatusStat extends BaseStat{
	generalOrderStatus: OrderStatus;
}

interface GeneralOrder {
	generalOrderStatusList: GeneralOrderStatusStat[];
	newGeneralOrderCount: number;
	totalGeneralOrderSales: number;
}

interface MemberCountByDate {
	date: string;
	newMemberCount: number;
}

interface OrderCountByDate {
	date: string;
	generalOrderCount: number;
	newSubscribeCount: number;
	totalSubscribeCount: number;
}

interface SalesCountByDate {
	date: string;
	totalSalesCount: number;
	generalOrderSalesCount: number;
	subscribeSalesCount: number;
}

interface Graph {
	lastLoginCount: number;
	totalMemberCount: number;
	memberCountByDateList: MemberCountByDate[];
	orderCountByDateList: OrderCountByDate[];
	salesCountByDateList: SalesCountByDate[];
}

interface OrderStatusStat extends BaseStat{
	orderStatus: OrderStatus;
}

interface Question {
	answeredCount: number;
	unansweredCount: number;
}

interface SalesByRecipe {
	recipeName: string;
	sales: number;
}

interface SubscribeCancelReason extends BaseStat {
	reason: string;
}

interface SubscribeStatus extends BaseStat {
	subscribeStatus: keyof typeof SUBSCRIBE_STATUS;
}

interface SubscribeSumGramByRecipe {
	recipeName: string;
	sum: number;
}

interface SubscriberByPlan extends BaseStat {
	plan: Plan;
}

interface SubscriberByRecipe extends BaseStat {
	recipeName: string;
}

interface Subscription {
	avgPaymentPrice: number;
	newSubscribeCount: number;
	subscribeCancelCount: number;
	totalSubscribeCount: number;
	totalSubscribeSales: number;
	totalSubscriberCount: number;
	subscribeCancelReasonList: SubscribeCancelReason[];
	subscribeStatusList: SubscribeStatus[];
	subscribeSumGramByRecipeList: SubscribeSumGramByRecipe[];
	subscriberByPlanList: SubscriberByPlan[];
	subscriberByRecipeList: SubscriberByRecipe[];
}

interface StatsDataResponse {
	from: string;
	to: string;
	totalOrderCount: number;
	totalSales: number;
	deliveryStatusList: DeliveryStatusStat[];
	generalOrder: GeneralOrder;
	graph: Graph;
	orderStatusList: OrderStatusStat[];
	question: Question;
	salesByRecipeList: SalesByRecipe[];
	subscription: Subscription;
}

export type {
	StatsSearchParams,
	GraphIntervalType,
	StatsDataResponse,
	DeliveryStatusStat,
	GeneralOrder,
	Question,
	OrderStatusStat,
	SalesByRecipe,
	Subscription,
	SubscribeCancelReason,
	SubscriberByPlan,
	SubscriberByRecipe,
	SubscribeSumGramByRecipe,
	OrderCountByDate,
	MemberCountByDate,
	SalesCountByDate,
}