// releaseCoupon, createReward 공통 사용
import { AreaType, GradeType } from "@/types/common";

interface FormValueFilter {
	// 공통 필터
	subscribe?: boolean;
	longUnconnected?: boolean;
	gradeList?: GradeType[];
	area?: AreaType;
	birthYearFrom?: string;
	birthYearTo?: string;
	memberIdList?: number[];
}

interface GroupFilter {
	subscribe: boolean;
	longUnconnected: boolean;
	gradeList: GradeType[];
	area: AreaType;
	birthYearFrom: string;
	birthYearTo: string;
}

interface PersonalFilter {
	memberIdList: number[];
}

export type {
	FormValueFilter,
	GroupFilter,
	PersonalFilter,
}