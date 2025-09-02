import { Pagination, ValueOfTuple } from "./common";
import type {
  DIAGNOSIS_STATUSES,
  PET_GENDERS,
  BODY_FITS,
  INTAKE_STATUSES,
  ALLERGY_STATUSES,
  ALLERGEN_FOODS,
  PREGNANCY_STATUSES,
  TREATING_DISEASES,
  FOOD_TYPES,
  FEED_TYPES,
  FEED_TIMES,
  DEFECATION_HABITS,
  PET_TYPES,
  SUPPLEMENT_TYPES,
  HEALTH_CONCERNS,
  ACQUISITION_TYPES,
  LEVEL5,
} from "@/constants/diagnosis";

type ProbiomeCategory = Exclude<
  keyof ProbiomeListRequest,
  "fromDate" | "toDate" | "diagnosisStatus"
>;

interface ProbiomeListRequest {
  fromDate: string;
  toDate: string;
  memberName: string | null;
  petName: string | null;
  kitSerialNumber: string | null;
  diagnosisStatus: DiagnosisStatus | null;
}

interface ProbiomeListParams {
  body: ProbiomeListRequest;
  page?: number;
  size?: number;
}

interface DiagnosisStatusConfig {
  label: string;
  chipColor: "gray100" | "lightPink" | "blue50";
  description?: string;
  buttonText?: string;
  nextStatus: DiagnosisStatus;
}

interface ProbiomeListItem {
  diagnosisId: number;
  diagnosisStatus: DiagnosisStatus;
  memberName: string;
  petName: string;
  phoneNumber: string;
  email: string;
  kitSerialNumber: string;
  /** 예: "2025-08-29 10:19:08" (문자열로 전달됨) */
  diagnosisDate: string;
}

/** 응답 데이터 루트 */
interface ProbiomeListResponse {
  pagination: Pagination;
  diagnosisList: ProbiomeListItem[];
}

// ===== 파생 타입 =====
type DiagnosisStatus = ValueOfTuple<typeof DIAGNOSIS_STATUSES>;
type PetGender = ValueOfTuple<typeof PET_GENDERS>;
type BodyFit = ValueOfTuple<typeof BODY_FITS>;
type IntakeStatus = ValueOfTuple<typeof INTAKE_STATUSES>;
type AllergyStatus = ValueOfTuple<typeof ALLERGY_STATUSES>;
type AllergenFood = ValueOfTuple<typeof ALLERGEN_FOODS>;
type PregnancyStatus = ValueOfTuple<typeof PREGNANCY_STATUSES>;
type Level5 = ValueOfTuple<typeof LEVEL5>;
type TreatingDisease = ValueOfTuple<typeof TREATING_DISEASES>;
type FoodType = ValueOfTuple<typeof FOOD_TYPES>;
type FeedType = ValueOfTuple<typeof FEED_TYPES>;
type FeedTime = ValueOfTuple<typeof FEED_TIMES>;
type DefecationHabit = ValueOfTuple<typeof DEFECATION_HABITS>;
type PetType = ValueOfTuple<typeof PET_TYPES>;
type SupplementType = ValueOfTuple<typeof SUPPLEMENT_TYPES>;
type HealthConcern = ValueOfTuple<typeof HEALTH_CONCERNS>;
type AcquisitionType = ValueOfTuple<typeof ACQUISITION_TYPES>;

// ===== VO =====
interface UrlObject {
  url: string;
}

interface DeliveryAddressInfo {
  deliveryName: string;
  recipientName: string;
  phoneNumber: string;
  zipCode: string;
  city: string;
  street: string;
  detailAddress: string;
}

interface DefecationFile {
  diagnosisId: number;
  petId: number;
  displayImageUrl: UrlObject;
  // 서버가 확장 필드를 추가할 수 있으므로 열어둠
  [key: string]: unknown;
}

// ===== Sections =====
interface DiagnosisInfo {
  id: number;
  status: DiagnosisStatus;
  downloadReport?: UrlObject | null;
}

interface AnalysisTimelineInfo {
  pickupCompletedDate?: string | null;
  sentLabDate?: string | null;
  reportCompletedDate?: string | null;
}

interface PickupRequestInfo {
  pickupRequestedDate: string;
  deliveryAddressInfo: DeliveryAddressInfo;
  defecationFileList: DefecationFile[];
}

interface MemberInfo {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

interface PetInfo {
  id: number;
  name: string;
  birthday: string; // "YYYY-MM-DD"
  gender: PetGender;
  breedName: string | null;
}

interface BasicInfoType {
  kitSerialNo: string;
  surveySubmittedDate: string;
  memberInfo: MemberInfo;
  petInfo: PetInfo;
}

interface SurveyInfoType {
  // 건강 상태
  bodyFit: BodyFit;
  probioticsStatus: IntakeStatus;
  probioticsProduct?: string | null;
  antibioticsStatus: IntakeStatus;
  allergyStatus: AllergyStatus;
  allergenFoodList: AllergenFood[];
  pregnancyStatus: PregnancyStatus;
  activityLevel: Level5;
  treatingDiseaseList: TreatingDisease[];

  // 생활 습관 및 기타
  foodType: FoodType;
  feedType: FeedType;
  foodProduct?: string | null;
  feedTime: FeedTime;
  defecationHabit: DefecationHabit;
  snackLevel: Level5;
  cohabitingPetList: PetType[];
  supplementTypeList: SupplementType[];
  supplementProduct?: string | null;
  healthConcernList: HealthConcern[];
  otherComment?: string | null;
  acquisitionType: AcquisitionType;
}

// ===== Response Root =====
interface ProbiomeDetailResponse {
  diagnosisInfo: DiagnosisInfo;
  analysisTimelineInfo: AnalysisTimelineInfo;
  pickupRequestInfo: PickupRequestInfo;
  basicInfo: BasicInfoType;
  surveyInfo: SurveyInfoType;
}

interface UpdateProbiomeStatusResponse {
  diagnosisId: number;
  diagnosisStatus: DiagnosisStatus;
}

export type {
  DiagnosisStatus,
  ProbiomeCategory,
  ProbiomeListResponse,
  DiagnosisStatusConfig,
  ProbiomeListRequest,
  ProbiomeListParams,
  ProbiomeListItem,
  PetGender,
  BodyFit,
  IntakeStatus,
  AllergyStatus,
  AllergenFood,
  PregnancyStatus,
  Level5,
  TreatingDisease,
  FoodType,
  FeedType,
  FeedTime,
  DefecationHabit,
  PetType,
  SupplementType,
  HealthConcern,
  AcquisitionType,
  UrlObject,
  DeliveryAddressInfo,
  DefecationFile,
  DiagnosisInfo,
  AnalysisTimelineInfo,
  PickupRequestInfo,
  MemberInfo,
  PetInfo,
  BasicInfoType,
  SurveyInfoType,
  ProbiomeDetailResponse,
  UpdateProbiomeStatusResponse,
};
