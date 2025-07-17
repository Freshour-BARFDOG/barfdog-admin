import { Page, SelectOption, StatusType } from "@/types/common";
import { ARTICLE_CATEGORY } from "@/constants/community";

type CommunityType = 'notices' | 'event' | 'article';

interface UploadResponse {
	id: number;
	url: string;
}

interface CommunityListData {
	id: number;
	title: string;
	createdDate: string;
	status: StatusType;
}

interface CommunityListResponse {
	list: CommunityListData[];
	page: Page;
}

interface CommunityImageData {
	blogImageId: number;
	filename: string;
	url: string;
}

interface NoticeInfoData {
	id?: number;
	status: StatusType;
	title: string;
	contents: string;
}

interface NoticeDetailResponse {
	noticeImageList: CommunityImageData[];
	noticeInfo: NoticeInfoData;
}

interface NoticeFormValues extends NoticeInfoData {
	addImageIdList: number[];
	deleteImageIdList: number[];
}

interface CreateNoticeFormValues extends NoticeInfoData {
	noticeImageIdList: number[];
}

type ArticleCategory = keyof typeof ARTICLE_CATEGORY;

interface ArticleInfoData {
	id?: number;
	status: StatusType;
	title: string;
	category: ArticleCategory | null;
	contents: string;
	thumbnailId: number | null;
	filename?: string;
	thumbnailUrl?: string;
}

interface ArticleDetailResponse {
	articleImageList: CommunityImageData[];
	articleInfo: ArticleInfoData;
}

interface ArticleFormValues extends ArticleInfoData {
	addImageIdList: number[];
	deleteImageIdList: number[];
}

interface CreateArticleFormValues extends ArticleInfoData {
	blogImageIdList: number[];
}

interface RecommendArticleListData {
	articleId: number;
	articleNumber: number;
	blogId: number;
	blogTitle: string;
}

interface RecommendArticleResponse {
	articleTitleList: SelectOption<number>[];
	selectedArticleList: RecommendArticleListData[];
}

interface RecommendArticleBody {
	firstBlogId: number;
	secondBlogId: number;
}

export type {
	CommunityType,
	UploadResponse,
	CommunityListData,
	CommunityListResponse,
	NoticeInfoData,
	NoticeDetailResponse,
	NoticeFormValues,
	CreateNoticeFormValues,
	ArticleCategory,
	ArticleDetailResponse,
	ArticleFormValues,
	CreateArticleFormValues,
	RecommendArticleListData,
	RecommendArticleResponse,
	RecommendArticleBody,
}
