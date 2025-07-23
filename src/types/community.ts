import { ImageFile, Page, SelectOption, StatusType } from "@/types/common";
import { ARTICLE_CATEGORY, INQUIRY_CATEGORY, INQUIRY_STATUS } from "@/constants/community";

type CommunityType = 'notices' | 'events' | 'article' | 'questions';

interface UploadResponse {
	id: number;
	url: string;
}

interface CommunityListData {
	id: number;
	title: string;
	createdDate: string;
	status: StatusType;
	// event
	imageUrl?: string;
	eventsAdminDto?: any;
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

interface CommunityImageIdList {
	addImageIdList: number[];
	deleteImageIdList: number[];
}

// ------------------------------------------------------------
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

interface NoticeFormValues extends NoticeInfoData, CommunityImageIdList {}

interface CreateNoticeFormValues extends NoticeInfoData {
	noticeImageIdList: number[];
}

// ------------------------------------------------------------
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

interface ArticleFormValues extends ArticleInfoData, CommunityImageIdList {}

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

// ------------------------------------------------------------
interface EventListData extends CommunityListData {
	imageUrl: string;
}

interface EventImageData extends Omit<CommunityImageData, 'blogImageId'> {
	id: number
	leakOrder: number;
}

interface EventInfoData {
	id?: number;
	status: StatusType;
	title: string;
	thumbnailId: number | null;
	filename: string;
	url: string;
}

interface EventDetailResponse {
	eventImageList: EventImageData[];
	eventInfo: EventInfoData;
}

type EventImageType = 'image' | 'thumbnail';

interface ImageOrderData extends ImageFile {
	leakOrder: number;
}

interface EventFormValues extends CommunityImageIdList {
	imageOrderDtoList: ImageOrderData[];
	status: StatusType;
	title: string;
	thumbnailId: number | null;
	thumbnailUrl?: string;
	filename?: string;
	url?: string;
}

interface CreateEventFormValues {
	status: StatusType;
	title: string;
	thumbnailId: number;
	eventImageRequestDtoList: ImageOrderData[];
}

type InquiryStatus = keyof typeof INQUIRY_STATUS;
type InquiryCategory = keyof typeof INQUIRY_CATEGORY;
type InquirySearchType = 'title' | 'name' | 'email';

interface InquiryListSearchParams {
	type: InquirySearchType;
	value: string;
	answerStatus: InquiryStatus;
	from: string;
	to: string;
}

interface AnswerData {
	id: number;
	title: string;
	createdDate: string;
}

interface InquiryListData {
	id: number;
	title: string;
	name: string;
	email: string;
	createdDate: string;
	answerStatus: InquiryStatus;
	category: InquiryCategory;
	type: string;
	answerList: AnswerData[];
}

interface InquiryListResponse {
	page: Page;
	inquiryList: InquiryListData[];
}

interface InquiryImageData {
	questionImageId: number;
	filename: string;
	url: string;
}

interface InquiryQuestionData {
	id: number;
	name: string;
	email: string;
	title: string;
	contents: string;
	createdDate: string;
	answerStatus: InquiryStatus;
	category: InquiryCategory;
	questionImgDtoList: InquiryImageData[];
	answerIdList: number[];
}

interface InquiryAnswerData {
	id: number;
	targetId: number;
	title: string;
	contents: string;
	createdDate: string;
	questionImgDtoList: InquiryImageData[];
}

interface InquiryDetailData {
	question: InquiryQuestionData;
	answers: InquiryAnswerData[];
}

interface CreateAnswerFormValues {
	contents: string;
	questionImgIdList: ImageOrderData[];
	targetId: number;
	title: string;
}

interface CreateAnswerBody extends Omit<CreateAnswerFormValues, 'questionImgIdList'> {
	questionImgIdList: number[];
}

export type {
	CommunityType,
	UploadResponse,
	CommunityListData,
	CommunityListResponse,
	ImageOrderData,
	// -----------------------------
	NoticeInfoData,
	NoticeDetailResponse,
	NoticeFormValues,
	CreateNoticeFormValues,
	// -----------------------------
	ArticleCategory,
	ArticleDetailResponse,
	ArticleFormValues,
	CreateArticleFormValues,
	// -----------------------------
	RecommendArticleListData,
	RecommendArticleResponse,
	RecommendArticleBody,
	// -----------------------------
	EventImageType,
	EventImageData,
	EventInfoData,
	EventListData,
	EventDetailResponse,
	EventFormValues,
	CreateEventFormValues,
	CreateAnswerBody,
	// -----------------------------
	InquiryStatus,
	AnswerData,
	InquiryListSearchParams,
	InquiryListData,
	InquiryListResponse,
	InquiryQuestionData,
	InquiryAnswerData,
	InquiryDetailData,
	CreateAnswerFormValues,
}
