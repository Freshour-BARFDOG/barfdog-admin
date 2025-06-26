import { Page } from "@/types/common";

type GradeType = '브론즈' | '실버' | '골드' | '플래티넘' | '다이아몬드' | '더 바프';

interface MemberListSearchParams {
	size: number;
	email: string;
	name: string;
	from: string;
	to: string;
	subscribing: string;
	gradeList: GradeType[];
}

interface MemberListData {
	id: number;
	grade: GradeType;
	name: string;
	email: string;
	phoneNumber: string;
	dogName: string | null,
	accumulatedAmount: number;
	subscribe: boolean;
	longUnconnected: boolean;
	alliance: string;
}

interface MemberListResponse {
	page: Page;
	memberList: MemberListData[]
}

export type {
	GradeType,
	MemberListSearchParams,
	MemberListData,
	MemberListResponse,
}