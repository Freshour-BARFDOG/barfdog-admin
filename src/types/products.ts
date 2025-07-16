import {
  GENERAL_PRODUCT_CATEGORY_MAP,
  ITEM_HEALTH_TYPE_MAP,
} from "@/constants/products";
import { DiscountUnitType, Page, PagePrams } from "./common";

type GeneralProductType = keyof typeof GENERAL_PRODUCT_CATEGORY_MAP;
type GeneralProductCreateType = Exclude<GeneralProductType, "ALL">;
type ProductVisibilityStatus = "LEAKED" | "HIDDEN";
type ItemIcons = "NEW" | "BEST";

interface GeneralProductSearchValues {
  itemType: GeneralProductType;
}

interface GeneralProductListParams extends PagePrams {
  itemType: GeneralProductType;
}

interface GeneralProductBaseRow {
  id: number;
  itemType: GeneralProductType;
  name: string;
  originalPrice: number; // 원가
  salePrice: number; // 판매가
  remaining: number; // 재고
  discount: string; // 일반할인 - 예)20%
  allianceDiscount: string | null; // 제휴할인 - 예)20원
  status: ProductVisibilityStatus; // 노출여부 - LEAKED, HIDDEN
  createdDate: string;
}

interface GeneralProductItem {
  id: number;
  itemType: GeneralProductType;
  itemHealthType: string;
  name: string;
  itemIcons: string;
  option: boolean;
  originalPrice: number;
  discount: string;
  allianceDiscount: string | null;
  salePrice: number;
  status: ProductVisibilityStatus;
  remaining: number;
  createdDate: string; // ISO 8601
  packageType: string | null;
  unit: string | null;
  pricePerUnit: number;
}

type GeneralProductItemList = GeneralProductItem[];

interface GeneralProductListResponse {
  items: GeneralProductItemList;
  page: Page;
}
type ItemHealthType = keyof typeof ITEM_HEALTH_TYPE_MAP;

interface AllianceDto {
  allianceId: number;
  allianceDegree: number;
  allianceDiscountType: DiscountUnitType;
  allianceSalePrice: number;
}

interface ItemImageOrderDto {
  id: number;
  leakOrder: number;
}

/** 옵션 저장 DTO */
interface ItemOptionSaveDto {
  name: string;
  price: number;
  remaining: number;
}

interface ItemOptionUpdateDto extends ItemOptionSaveDto {
  id: number;
}

interface GeneralProductCommonFields {
  allianceDtoList: AllianceDto[];
  contents: string;
  deliveryFree: boolean;
  description: string;
  discountDegree: number;
  discountType: DiscountUnitType;
  inStock: boolean;
  itemHealthType: string;
  itemIcons: string;
  itemStatus: ProductVisibilityStatus;
  itemType: GeneralProductCreateType;
  name: string;
  originalPrice: number;
  remaining: number;
  salePrice: number;
}

/** Create 용 추가 필드 */
interface CreateGeneralProductRequest extends GeneralProductCommonFields {
  contentImageIdList: number[];
  itemImageOrderDtoList: ItemImageOrderDto[];
  itemOptionSaveDtoList: ItemOptionSaveDto[];
}

/** Update 용 추가 필드 */
interface UpdateGeneralProductRequest extends GeneralProductCommonFields {
  addContentImageIdList: number[];
  addImageIdList: number[];
  deleteContentImageIdList: number[];
  deleteImageIdList: number[];
  deleteOptionIdList: number[];
  imageOrderDtoList: ItemImageOrderDto[];
  itemOptionSaveDtoList: ItemOptionSaveDto[];
  itemOptionUpdateDtoList: ItemOptionUpdateDto[];
}

interface GetAllianceListResponse {
  allianceId: number;
  allianceCode: string;
  allianceName: string;
}

export type {
  GeneralProductType,
  GeneralProductCreateType,
  GeneralProductListParams,
  GeneralProductSearchValues,
  GeneralProductBaseRow,
  GeneralProductItem,
  GeneralProductItemList,
  GeneralProductListResponse,
  ItemHealthType,
  CreateGeneralProductRequest,
  UpdateGeneralProductRequest,
  ProductVisibilityStatus,
  AllianceDto,
  GetAllianceListResponse,
  ItemIcons,
};
