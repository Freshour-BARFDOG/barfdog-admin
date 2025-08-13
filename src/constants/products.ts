import { SelectOption } from "@/types/common";
import {
  GeneralProductCreateType,
  GeneralProductType,
  ItemHealthType,
  ItemIcons,
  ProductVisibilityStatus,
} from "@/types/products";

const INITIAL_PRODUCTS_REQUEST = {
  itemType: "ALL" as GeneralProductType,
};

const ITEM_HEALTH_TYPE_MAP = {
  DIARRHEA: "잦은 설사",
  WEIGHT_MANAGEMENT: "체중 조절",
  FATIGUE_RECOVERY: "피로 회복",
  VOMITING: "잦은 구토",
  WATER_INTAKE: "음수량 부족",
  COAT_CARE: "모질 관리",
  JOINT_HEALTH: "관절 건강",
  PUPPY_DEVELOPMENT: "자견 발육",
  SENIOR_HEALTH: "노령견 건강",
  // NONE: "없음",
} as const;

const ITEM_HEALTH_TYPE_KEYS = Object.keys(
  ITEM_HEALTH_TYPE_MAP
) as ItemHealthType[];

const ITEM_HEALTH_TYPE_OPTIONS: SelectOption<ItemHealthType>[] = [
  { value: "DIARRHEA", label: ITEM_HEALTH_TYPE_MAP.DIARRHEA },
  { value: "WEIGHT_MANAGEMENT", label: ITEM_HEALTH_TYPE_MAP.WEIGHT_MANAGEMENT },
  { value: "FATIGUE_RECOVERY", label: ITEM_HEALTH_TYPE_MAP.FATIGUE_RECOVERY },
  { value: "VOMITING", label: ITEM_HEALTH_TYPE_MAP.VOMITING },
  { value: "WATER_INTAKE", label: ITEM_HEALTH_TYPE_MAP.WATER_INTAKE },
  { value: "COAT_CARE", label: ITEM_HEALTH_TYPE_MAP.COAT_CARE },
  { value: "JOINT_HEALTH", label: ITEM_HEALTH_TYPE_MAP.JOINT_HEALTH },
  { value: "PUPPY_DEVELOPMENT", label: ITEM_HEALTH_TYPE_MAP.PUPPY_DEVELOPMENT },
  { value: "SENIOR_HEALTH", label: ITEM_HEALTH_TYPE_MAP.SENIOR_HEALTH },
  // { value: "NONE", label: ITEM_HEALTH_TYPE_MAP.NONE },
];

const GENERAL_PRODUCT_CATEGORY_MAP = {
  ALL: "전체",
  RAW: "생식",
  COOKED: "화식",
  TOPPING: "토핑",
  SNACK: "간식",
  ETC: "기타",
} as const;

const GENERAL_PRODUCT_CATEGORY_OPTIONS: SelectOption<GeneralProductType>[] = (
  Object.entries(GENERAL_PRODUCT_CATEGORY_MAP) as [GeneralProductType, string][]
).map(([value, label]) => ({ value, label }));

/** 등록 페이지에서 쓸 옵션 배열: ALL 제외 */
const GENERAL_PRODUCT_CATEGORY_OPTIONS_FOR_CREATE =
  GENERAL_PRODUCT_CATEGORY_OPTIONS.filter(
    (opt): opt is SelectOption<GeneralProductCreateType> => opt.value !== "ALL"
  );

const BOOLEAN_OPTIONS: SelectOption<boolean>[] = [
  { value: true, label: "Y" },
  { value: false, label: "N" },
];
const ICON_TYPE_OPTIONS: SelectOption<ItemIcons>[] = [
  { value: "BEST", label: "BEST" },
  { value: "NEW", label: "NEW" },
];
const DELIVERY_FREE_OPTIONS: SelectOption<boolean>[] = [
  { value: false, label: "유료" },
  { value: true, label: "무료" },
];
const ITEM_STATUS_OPTIONS: SelectOption<ProductVisibilityStatus>[] = [
  { value: "LEAKED", label: "노출" },
  { value: "HIDDEN", label: "숨김" },
];

// General Product Form 상수들
const GENERAL_PRODUCT_FORM_TEXTS = {
  LABELS: {
    CATEGORY: "카테고리",
    RECOMMENDED_PRODUCT: "추천 상품",
    PRODUCT_NAME: "상품명",
    PRODUCT_DESCRIPTION: "상품 설명",
    PRODUCT_PRICE: "상품가격",
    PRODUCT_ICON: "상품 아이콘",
    DELIVERY_FEE: "배송비",
    VISIBILITY: "노출여부",
    DISCOUNT_SETTING: "할인설정",
    ADD_ALLIANCE: "제휴사 추가",
    STOCK_STATUS: "재고 여부",
    ADD_OPTION: "옵션 추가",
    PRODUCT_IMAGES: "상품 이미지",
    DETAILED_CONTENT: "상세 내용",
  },
  BUTTONS: {
    CANCEL: "취소",
    REGISTER: "등록",
    SELECT_ALLIANCE: "제휴사 선택",
  },
  TOOLTIPS: {
    STOCK_STATUS: {
      TITLE: "재고 여부",
      CONTENT: "1. 품절된 상품은 아이템리스트 내에 품절처리 UI로 나타납니다.\n2. 품절된 상품은 상세페이지로 접근할 수 없습니다.",
    },
    ADD_OPTION: {
      TITLE: "옵션 추가",
      CONTENT: "1. 옵션명, 재고수량은 필수항목입니다.\n2. 사용하지 않는 옵션항목은 삭제하세요",
    },
    PRODUCT_ICON: {
      TITLE: "상품 아이콘",
      CONTENT: "일반상품리스트 썸네일 상단에 노출된 아이콘입니다.",
    },
  },
  UNITS: {
    PRICE: "원 이상",
    QUANTITY: "개",
  },
  PLACEHOLDERS: {
    SELECT_ALLIANCE: "제휴사 선택",
  },
  IMAGE_CAPTIONS: [
    "* 이미지는 최소 1장, 최대 10장까지 등록 가능합니다.",
    "* 파일 크기는 10MB 이하, jpg/jpeg/png/gif만 허용됩니다.",
  ],
} as const;

const GENERAL_PRODUCT_FORM_CONFIG = {
  MAX_FILES: 10,
  IMAGE_UPLOAD_SIZE: {
    WIDTH: 100,
    HEIGHT: 100,
  },
} as const;

export {
  INITIAL_PRODUCTS_REQUEST,
  ITEM_HEALTH_TYPE_OPTIONS,
  ITEM_HEALTH_TYPE_MAP,
  GENERAL_PRODUCT_CATEGORY_OPTIONS,
  GENERAL_PRODUCT_CATEGORY_MAP,
  GENERAL_PRODUCT_CATEGORY_OPTIONS_FOR_CREATE,
  ITEM_HEALTH_TYPE_KEYS,
  BOOLEAN_OPTIONS,
  ICON_TYPE_OPTIONS,
  DELIVERY_FREE_OPTIONS,
  ITEM_STATUS_OPTIONS,
  GENERAL_PRODUCT_FORM_TEXTS,
  GENERAL_PRODUCT_FORM_CONFIG,
};
