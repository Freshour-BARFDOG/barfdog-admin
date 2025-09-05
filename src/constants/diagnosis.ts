import {
  ProbiomeCategory,
  DiagnosisStatus,
  DiagnosisStatusConfig,
} from "@/types/diagnosis";
import type {
  PetGender,
  BodyFit,
  IntakeStatus,
  AllergyStatus,
  AllergenFood,
  PregnancyStatus,
  TreatingDisease,
  FoodType,
  FeedType,
  FeedTime,
  DefecationHabit,
  PetType,
  SupplementType,
  HealthConcern,
  AcquisitionType,
  Level5,
  DiagnosisKitType,
  DiagnosisKitGroupStatus,
} from "@/types/diagnosis";
import { OLDEST_DATE, TODAY } from "./common";
import { SelectOption } from "@/types/common";

const PROBIOME_CATEGORY: {
  label: string;
  value: ProbiomeCategory;
}[] = [
  { label: "견주 이름", value: "memberName" },
  { label: "반려견명", value: "petName" },
  { label: "시리얼 번호", value: "kitSerialNumber" },
];

const INITIAL_PROBIOME_REQUEST = {
  fromDate: OLDEST_DATE,
  toDate: TODAY,
  memberName: null, // 구매자 이름
  petName: null, // 반려견 이름
  kitSerialNumber: null,
  diagnosisStatus: null,
};

const PROBIOME_STATUS: {
  label: string;
  value: DiagnosisStatus | null;
}[] = [
  { label: "전체", value: null },
  { label: "문진 작성완료", value: "SURVEY_SUBMITTED" },
  { label: "회수 요청", value: "KIT_PICKUP_REQUESTED" },
  { label: "회수 완료", value: "KIT_PICKUP_COMPLETED" },
  { label: "분석중", value: "ANALYSIS_IN_PROGRESS" },
  { label: "결과지 업로드 완료", value: "REPORT_COMPLETED" },
];

const PROBIOME_STATUS_CONFIG: Record<DiagnosisStatus, DiagnosisStatusConfig> = {
  SURVEY_SUBMITTED: {
    label: "문진 작성완료",
    chipColor: "gray100",
    nextStatus: "KIT_PICKUP_REQUESTED",
  },
  KIT_PICKUP_REQUESTED: {
    label: "회수 신청",
    chipColor: "lightPink",
    description:
      "사용자가 키트 회수 신청을 완료했어요. 택배사를 통해 회수를 진행해 주세요.\n회수가 완료되면 아래 버튼을 눌러 상태를 업데이트해 주세요.",
    buttonText: "회수 완료 처리",
    nextStatus: "KIT_PICKUP_COMPLETED",
  },
  KIT_PICKUP_COMPLETED: {
    label: "회수 완료",
    chipColor: "lightPink",
    description:
      "키트 회수가 완료되었어요. 이제 분석 업체에 검체 분석을 요청해 주세요.\n분석 요청을 이미 진행하셨다면 아래 버튼을 눌러 상태를 업데이트해 주세요.",
    buttonText: "분석 요청 완료 처리",
    nextStatus: "ANALYSIS_IN_PROGRESS",
  },
  ANALYSIS_IN_PROGRESS: {
    label: "분석 중",
    chipColor: "blue50",
    description:
      "분석 업체에 요청이 완료되어 현재 분석이 진행 중입니다. 업체의 분석 결과가 도착했다면 결과지를 업로드해 주세요.\n업로드 후 아래 버튼을 통해 결과지 파일을 업로드해야 고객이 결과지를 확인할 수 있어요.",
    buttonText: "결과지 업로드하기",
    nextStatus: "REPORT_COMPLETED",
  },
  REPORT_COMPLETED: {
    label: "결과지 업로드 완료",
    chipColor: "blue50",
    description:
      "결과지가 사용자에게 정상 전송되었습니다.\n사용자는 마이페이지에서 결과를 열람할 수 있어요.",
    buttonText: "결과지 파일 수정하기",
    nextStatus: "REPORT_COMPLETED",
  },
};

const LEVEL5 = ["VERY_LOW", "LOW", "NORMAL", "HIGH", "VERY_HIGH"] as const;

/** 진단 상태 */
const DIAGNOSIS_STATUSES = [
  "SURVEY_SUBMITTED",
  "KIT_PICKUP_REQUESTED",
  "KIT_PICKUP_COMPLETED",
  "ANALYSIS_IN_PROGRESS",
  "REPORT_COMPLETED",
] as const;

/** 펫 성별 */
const PET_GENDERS = ["NONE", "MALE", "FEMALE"] as const;

/** 체형 */
const BODY_FITS = ["VERY_THIN", "THIN", "NORMAL", "FAT", "VERY_FAT"] as const;

/** 유산균/항생제 투여 여부 */
const INTAKE_STATUSES = ["UNKNOWN", "TAKING", "NOT_TAKING"] as const;

/** 알러지 여부 */
const ALLERGY_STATUSES = ["HAS_ALLERGY", "NO_ALLERGY", "UNKNOWN"] as const;

/** 알러지 유발 식품 */
const ALLERGEN_FOODS = [
  // Fruit
  "APPLE",
  "STRAWBERRY",
  "BLUEBERRY",
  "GREEN_BANANA",
  // Grain
  "FLAX_SEED",
  "CHIA_SEED",
  "HEMP_SEED",
  // Plant
  "TURMERIC",
  // Meat
  "BEEF",
  "PORK",
  "GOAT",
  "LAMB",
  "RABBIT",
  "CHICKEN",
  "QUAIL",
  "DUCK",
  "OSTRICH",
  "TURKEY",
  // Dairy/Egg
  "EGG_YOLK",
  "CHEESE",
  // Seafood
  "ANCHOVY",
  "COD",
  // Seaweed
  "KELP",
  // Vegetable
  "CABBAGE",
  "PUMPKIN",
  "BEET",
  "CAULIFLOWER",
  "PAPRIKA",
  "SWEET_POTATO",
  "KALE",
  // Fungi
  "SHIITAKE",
  // Oil
  "COCONUT",
  // Other
  "HONEY",
] as const;

/** 임신 상태 (샘플 데이터의 PREGNANCY_EARLY/LATE도 수용) */
const PREGNANCY_STATUSES = [
  "NONE",
  "EARLY",
  "LATE",
  "PREGNANCY_EARLY",
  "PREGNANCY_LATE",
] as const;

/** 치료 중 질환 */
const TREATING_DISEASES = [
  "NONE",
  // 1. 신경계
  "EPILEPSY",
  "DEMENTIA",
  "IVDD",
  // 2. 심혈관계
  "HEART_DISEASE",
  "MMVD",
  "HYPERLIPIDEMIA",
  "HEARTWORM",
  "ARRHYTHMIA",
  "DCM",
  "CHF",
  // 3. 근골격계
  "PATELLAR_LUXATION",
  "HIP_DYSPLASIA",
  "ARTHRITIS",
  "OCD",
  "ACL_TEARS",
  "DEGENERATIVE_ARTHRITIS",
  // 4. 피부
  "DERMATITIS",
  "ATOPIC_DERMATITIS",
  "ALLERGIC_DERMATITIS",
  "FLEA_TICK_DERMATITIS",
  "OTITIS",
  "MYCOTIC_DERMATITIS",
  "BACTERIAL_DERMATITIS",
  "MALASSEZIA_DERMATITIS",
  // 5. 내분비/대사
  "HYPOTHYROIDISM",
  "LIVER_DISEASE",
  "CUSHING_SYNDROME",
  "STRUMITIS",
  "HYPERTHYROIDISRM",
  "THYROID_CANCER",
  // 6. 소화기
  "IBD",
  "GASTRITIS",
  "ESOPHAGITIS",
  "ANAL_GLAND",
  "PANCREATITIS",
  "ENTERITIS",
  "HEMORRHAGIC_ENTERITIS",
  "GASTRIC_ULCER",
  "IBS",
  // 7. 구강/치아
  "PERIODONTAL_DISEASE",
  "TARTAR_PLAQUE",
  "CRACKED_TOOTH",
  "STOMATITIS",
  // 8. 안과
  "ENTROPION",
  "CATARACT",
  "GLAUCOMA",
  "OCULAR_DISEASES",
  "DRY_EYE",
  "CONJUNCTIVITIS",
  "CORNEAL_ULCER",
  // 9. 비뇨기
  "RENAL_DISEASE",
  "REPRODUCTIVE_DISEASE",
  "DIABETES",
  "RENAL_INSUFFICIENCY",
  "UROLITHIASIS",
  "AKI",
  "CKD",
  // 10. 면역
  "IMMUNODEFICIENCY",
  "AUTOIMMUNE_DERMATOSIS",
  "LYMPHOMA",
  "IMHA",
  // 11. 비만
  "OBESITY",
  // 12. 종양
  "CANCER",
] as const;

/** 사료 종류 */
const FOOD_TYPES = [
  "DRY",
  "WET",
  "COOKED",
  "RAW",
  "HUMAN_FOOD",
  "HOME_MADE_FOOD",
  "FREEZE_DRY_FOOD",
] as const;

/** 급여 방식 */
const FEED_TYPES = ["FREE", "RESTRICTED"] as const;

/** 급여 시간 */
const FEED_TIMES = ["MORNING", "NOON", "EVENING"] as const;

/** 배변 습관 */
const DEFECATION_HABITS = ["INDOOR", "OUTDOOR", "BOTH"] as const;

/** 반려동물 타입 */
const PET_TYPES = ["NONE", "DOG", "CAT"] as const;

/** 영양제 타입 */
const SUPPLEMENT_TYPES = [
  "NONE",
  "PROBIOTICS",
  "OMEGA_3",
  "ANTIOXIDANT",
  "EYE",
  "JOINT",
  "SKIN",
  "IMMUNE",
  "HEART",
  "TEETH",
  "RESPIRATORY",
  "VITAMIN",
  "INTESTINE",
  "OTHER",
] as const;

/** 건강 관심사 */
const HEALTH_CONCERNS = [
  "NONE",
  // 주요
  "DIGESTIVE_CARE",
  "WEIGHT_MANAGEMENT",
  "VITALITY_BOOST",
  "TEAR_STAIN",
  "SKIN_COAT",
  "JOINT_CARE",
  "PUPPY_GROWTH",
  "AGING_CARE",
  // 그 외
  "OBESITY",
  "PREGNANCY",
  "LACTATION",
] as const;

/** 수령 경로 */
const ACQUISITION_TYPES = ["EVENT", "PURCHASE"] as const;

const DIAGNOSIS_KIT_TYPE = ["PROBIOME"] as const;
const DIAGNOSIS_KIT_GROUP_STATUS = [
  "SERIAL_NUM_GENERATED",
  "SERIAL_NUM_ISSUED",
] as const;

const DIAGNOSIS_KIT_TYPE_LABEL = {
  PROBIOME: "미생물 진단",
} as const satisfies Record<DiagnosisKitType, string>;

const DIAGNOSIS_KIT_TYPE_CATEGORY_OPTIONS: SelectOption<DiagnosisKitType>[] = (
  Object.entries(DIAGNOSIS_KIT_TYPE_LABEL) as [DiagnosisKitType, string][]
).map(([value, label]) => ({ value, label }));

const DIAGNOSIS_KIT_GROUP_STATUS_LABEL = {
  SERIAL_NUM_GENERATED: "생성",
  SERIAL_NUM_ISSUED: "발행",
} as const satisfies Record<DiagnosisKitGroupStatus, string>;

const DIAGNOSIS_STATUS_LABEL = {
  SURVEY_SUBMITTED: "문진 작성 완료",
  KIT_PICKUP_REQUESTED: "키트 회수 요청",
  KIT_PICKUP_COMPLETED: "키트 회수 완료",
  ANALYSIS_IN_PROGRESS: "검사소 분석 중",
  REPORT_COMPLETED: "검사 결과 완료",
} as const satisfies Record<DiagnosisStatus, string>;

/** 펫 성별 */
const PET_GENDER_LABEL = {
  NONE: "모름",
  MALE: "수컷",
  FEMALE: "암컷",
} as const satisfies Record<PetGender, string>;

/** 체형 */
const BODY_FIT_LABEL = {
  VERY_THIN: "매우 마름",
  THIN: "마름",
  NORMAL: "적정 체중",
  FAT: "과체중",
  VERY_FAT: "심각한 비만",
} as const satisfies Record<BodyFit, string>;

/** 유산균/항생제 투여 여부 */
const INTAKE_STATUS_LABEL = {
  UNKNOWN: "잘 모르겠음",
  TAKING: "투여/급여 중",
  NOT_TAKING: "투여/급여 안함",
} as const satisfies Record<IntakeStatus, string>;

/** 알러지 여부 */
const ALLERGY_STATUS_LABEL = {
  HAS_ALLERGY: "알러지 있음",
  NO_ALLERGY: "알러지 없음",
  UNKNOWN: "잘 모르겠음",
} as const satisfies Record<AllergyStatus, string>;

/** 알러지 유발 식품 */
const ALLERGEN_FOOD_LABEL = {
  // Fruit
  APPLE: "사과",
  STRAWBERRY: "딸기",
  BLUEBERRY: "블루베리",
  GREEN_BANANA: "녹색바나나",
  // Grain
  FLAX_SEED: "아마 씨",
  CHIA_SEED: "치아 씨드",
  HEMP_SEED: "햄프 씨드",
  // Plant
  TURMERIC: "강황",
  // Meat
  BEEF: "소",
  PORK: "돼지",
  GOAT: "염소",
  LAMB: "양",
  RABBIT: "토끼",
  CHICKEN: "닭",
  QUAIL: "메추라기",
  DUCK: "오리",
  OSTRICH: "타조",
  TURKEY: "칠면조",
  // Dairy/Egg
  EGG_YOLK: "계란 노른자",
  CHEESE: "치즈",
  // Seafood
  ANCHOVY: "멸치",
  COD: "대구",
  // Seaweed
  KELP: "켈프",
  // Vegetable
  CABBAGE: "양배추",
  PUMPKIN: "호박",
  BEET: "비트",
  CAULIFLOWER: "콜리플라워",
  PAPRIKA: "파프리카",
  SWEET_POTATO: "고구마",
  KALE: "케일",
  // Fungi
  SHIITAKE: "표고버섯",
  // Oil
  COCONUT: "코코넛오일",
  // Other
  HONEY: "꿀",
} as const satisfies Record<AllergenFood, string>;

/** 임신 상태 (두 표기 모두 수용) */
const PREGNANCY_STATUS_LABEL = {
  NONE: "임신 안함",
  EARLY: "임신 초기",
  LATE: "임신 후기",
  PREGNANCY_EARLY: "임신 초기",
  PREGNANCY_LATE: "임신 후기",
} as const satisfies Record<PregnancyStatus, string>;

/** 치료 중 질환 */
const TREATING_DISEASE_LABEL = {
  NONE: "해당없음",
  // 1. 신경계
  EPILEPSY: "간질",
  DEMENTIA: "치매",
  IVDD: "디스크(IVDD)",
  // 2. 심혈관계
  HEART_DISEASE: "심장병",
  MMVD: "이첨판 폐쇄부전증(MMVD)",
  HYPERLIPIDEMIA: "고지혈증",
  HEARTWORM: "심장사상충증",
  ARRHYTHMIA: "부정맥",
  DCM: "확장성 심근증",
  CHF: "심부전",
  // 3. 근골격계
  PATELLAR_LUXATION: "슬개골 탈구",
  HIP_DYSPLASIA: "고관절 이형성증",
  ARTHRITIS: "관절염",
  OCD: "골연골증",
  ACL_TEARS: "전십자인대 파열",
  DEGENERATIVE_ARTHRITIS: "퇴행성 관절염",
  // 4. 피부
  DERMATITIS: "피부염",
  ATOPIC_DERMATITIS: "아토피성 피부염",
  ALLERGIC_DERMATITIS: "알레르기성 피부염",
  FLEA_TICK_DERMATITIS: "벼룩·진드기 피부염",
  OTITIS: "귀 염증",
  MYCOTIC_DERMATITIS: "진균성 피부염",
  BACTERIAL_DERMATITIS: "세균성 피부염",
  MALASSEZIA_DERMATITIS: "말라세지아 피부염",
  // 5. 내분비/대사
  HYPOTHYROIDISM: "갑상선 기능저하증",
  LIVER_DISEASE: "간 질환",
  CUSHING_SYNDROME: "쿠싱증후군",
  STRUMITIS: "갑상선염",
  HYPERTHYROIDISRM: "갑상선 기능 항진증",
  THYROID_CANCER: "갑상선 암",
  // 6. 소화기
  IBD: "염증성 장 질환",
  GASTRITIS: "위장염",
  ESOPHAGITIS: "식도염",
  ANAL_GLAND: "항문낭염",
  PANCREATITIS: "췌장염",
  ENTERITIS: "장염",
  HEMORRHAGIC_ENTERITIS: "출혈성 장염",
  GASTRIC_ULCER: "위궤양",
  IBS: "과민성 대장 증후군",
  // 7. 구강/치아
  PERIODONTAL_DISEASE: "치주염",
  TARTAR_PLAQUE: "치석 축적",
  CRACKED_TOOTH: "치아 균열·파절",
  STOMATITIS: "구내염",
  // 8. 안과
  ENTROPION: "안검내반",
  CATARACT: "백내장",
  GLAUCOMA: "녹내장",
  OCULAR_DISEASES: "눈물자국",
  DRY_EYE: "건성안(안구건조증)",
  CONJUNCTIVITIS: "결막염",
  CORNEAL_ULCER: "각막궤양",
  // 9. 비뇨기
  RENAL_DISEASE: "신장 질환",
  REPRODUCTIVE_DISEASE: "성기능 질환",
  DIABETES: "당뇨병",
  RENAL_INSUFFICIENCY: "신장기능저하",
  UROLITHIASIS: "요로결석",
  AKI: "급성 신부전",
  CKD: "만성 신부전",
  // 10. 면역
  IMMUNODEFICIENCY: "면역 결핍증",
  AUTOIMMUNE_DERMATOSIS: "자가면역 피부질환",
  LYMPHOMA: "림프종",
  IMHA: "면역 매개성 용혈성 빈혈(IMHA)",
  // 11. 비만
  OBESITY: "비만",
  // 12. 종양
  CANCER: "종양 및 암",
} as const satisfies Record<TreatingDisease, string>;

/** 사료 종류 */
const FOOD_TYPE_LABEL = {
  DRY: "건사료",
  WET: "습식사료",
  COOKED: "화식사료",
  RAW: "생식사료",
  HUMAN_FOOD: "사람이 먹는 음식",
  HOME_MADE_FOOD: "홈메이드식",
  FREEZE_DRY_FOOD: "동결건조사료",
} as const satisfies Record<FoodType, string>;

/** 급여 방식 */
const FEED_TYPE_LABEL = {
  FREE: "자율급식",
  RESTRICTED: "제한급식",
} as const satisfies Record<FeedType, string>;

/** 급여 시간 */
const FEED_TIME_LABEL = {
  MORNING: "아침",
  NOON: "점심",
  EVENING: "저녁",
} as const satisfies Record<FeedTime, string>;

/** 배변 습관 */
const DEFECATION_HABIT_LABEL = {
  INDOOR: "실내배변",
  OUTDOOR: "실외배변",
  BOTH: "실내외배변",
} as const satisfies Record<DefecationHabit, string>;

/** 반려동물 타입 */
const PET_TYPE_LABEL = {
  NONE: "없음",
  DOG: "강아지",
  CAT: "고양이",
} as const satisfies Record<PetType, string>;

/** 영양제 타입 */
const SUPPLEMENT_TYPE_LABEL = {
  NONE: "없음",
  PROBIOTICS: "유산균",
  OMEGA_3: "오메가-3",
  ANTIOXIDANT: "항산화",
  EYE: "눈",
  JOINT: "관절",
  SKIN: "피부",
  IMMUNE: "면역력",
  HEART: "심장",
  TEETH: "치아",
  RESPIRATORY: "기관지",
  VITAMIN: "종합비타민",
  INTESTINE: "장",
  OTHER: "기타",
} as const satisfies Record<SupplementType, string>;

/** 건강 관심사 */
const HEALTH_CONCERN_LABEL = {
  NONE: "해당 없음",
  // 주요
  DIGESTIVE_CARE: "구토/설사",
  WEIGHT_MANAGEMENT: "체중조절",
  VITALITY_BOOST: "기력보충",
  TEAR_STAIN: "눈물/눈곱",
  SKIN_COAT: "피부/모질",
  JOINT_CARE: "관절 건강",
  PUPPY_GROWTH: "자견 발육",
  AGING_CARE: "노령견 건강",
  // 그 외
  OBESITY: "과체중",
  PREGNANCY: "임신 중",
  LACTATION: "수유 중",
} as const satisfies Record<HealthConcern, string>;

/** 수령 경로 */
const ACQUISITION_TYPE_LABEL = {
  EVENT: "이벤트",
  PURCHASE: "구매",
} as const satisfies Record<AcquisitionType, string>;

const LEVEL5_LABEL = {
  VERY_LOW: "매우 적어요",
  LOW: "적어요",
  NORMAL: "적당해요",
  HIGH: "많아요",
  VERY_HIGH: "매우 많아요",
} as const satisfies Record<Level5, string>;

const PET_TYPES_LABEL = {
  NONE: "없음",
  CAT: "고양이",
  DOG: "강아지",
} as const satisfies Record<PetType, string>;

const ACQUISITION_TYPES_LABEL = {
  EVENT: "이벤트",
  PURCHASE: "구매",
} as const satisfies Record<AcquisitionType, string>;

const DIAGNOSIS_STATUSES_LABEL = {
  SURVEY_SUBMITTED: "문진 작성완료",
  KIT_PICKUP_REQUESTED: "회수 요청",
  KIT_PICKUP_COMPLETED: "회수 완료",
  ANALYSIS_IN_PROGRESS: "분석중",
  REPORT_COMPLETED: "결과지 업로드 완료",
} as const satisfies Record<DiagnosisStatus, string>;

export {
  PROBIOME_CATEGORY,
  INITIAL_PROBIOME_REQUEST,
  PROBIOME_STATUS,
  PROBIOME_STATUS_CONFIG,
  LEVEL5,
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
  DIAGNOSIS_STATUS_LABEL,
  PET_GENDER_LABEL,
  BODY_FIT_LABEL,
  INTAKE_STATUS_LABEL,
  ALLERGY_STATUS_LABEL,
  ALLERGEN_FOOD_LABEL,
  PREGNANCY_STATUS_LABEL,
  TREATING_DISEASE_LABEL,
  FOOD_TYPE_LABEL,
  FEED_TYPE_LABEL,
  FEED_TIME_LABEL,
  DEFECATION_HABIT_LABEL,
  PET_TYPE_LABEL,
  SUPPLEMENT_TYPE_LABEL,
  HEALTH_CONCERN_LABEL,
  ACQUISITION_TYPE_LABEL,
  LEVEL5_LABEL,
  PET_TYPES_LABEL,
  ACQUISITION_TYPES_LABEL,
  DIAGNOSIS_STATUSES_LABEL,
  DIAGNOSIS_KIT_TYPE,
  DIAGNOSIS_KIT_TYPE_LABEL,
  DIAGNOSIS_KIT_GROUP_STATUS,
  DIAGNOSIS_KIT_GROUP_STATUS_LABEL,
  DIAGNOSIS_KIT_TYPE_CATEGORY_OPTIONS,
};
