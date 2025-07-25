import { REVIEW_STATUS } from "@/constants/review";
import { ImageFile, Page } from "@/types/common";

// 공통 -------------------------------
type ReviewActionType =
	| 'approve'
	| 'selectBest'
	| 'delete'
	| 'deleteBest'
	| 'reject'
	| 'reorderBest';

	// 액션별 payload 정의
type ReviewActionPayloadMap = {
	approve: { ids: number[] };
	selectBest: { ids: number[] };
	delete: { ids: number[] };
	deleteBest: { ids: number[] };
	reject: { ids: number[]; reason: string };
	reorderBest: { leakedOrderDtoList: BestReviewLeakedOrder[] };
};

type ReviewActionMeta<TPayload> = {
	method: 'post' | 'put' | 'delete';
	getUrl: (payload: TPayload) => string;
	getBody?: (payload: TPayload) => any;
};

type ReviewStatus = keyof typeof REVIEW_STATUS;

// 리뷰 목록 -------------------------------
interface ReviewListSearchParams {
	order: string;
	from: string;
	to: string;
	status: ReviewStatus;
}

interface ReviewListData {
	id: number;
	status: ReviewStatus;
	title: string;
	star: number;
	titleByAdmin: null | string;
	contents: string;
	createdDate: string;
	name: string;
	email: string;
}

interface ReviewListResponse {
	page: Page;
	reviewList: ReviewListData[];
}

// 리뷰 상세 -------------------------------
interface ReviewDetailData {
	id: number;
	status: ReviewStatus;
	writtenDate: string;
	star: number;
	username: string;
	titleByAdmin: null | string;
	contents: string;
}

interface ReviewDetailResponse {
	reviewInfo: ReviewDetailData;
	imageUrlList: ImageFile[]
	bestReview: boolean;
}

// 베스트 리뷰 목록 -------------------------------
interface BestReviewLeakedOrder {
	id: number;
	leakedOrder: number;
}

interface BestReviewData extends BestReviewLeakedOrder {
	reviewId: number;
	title: string;
	star: number;
	titleByAdmin: null | string;
	contents: string;
	createdDate: string;
	name: string;
	email: string;
}

export type {
	ReviewActionType,
	ReviewActionPayloadMap,
	ReviewActionMeta,
	ReviewStatus,
	
	ReviewListSearchParams,
	ReviewListData,
	
	ReviewListResponse,
	ReviewDetailResponse,
	
	BestReviewLeakedOrder,
	BestReviewData,
}