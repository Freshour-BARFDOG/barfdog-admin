import { GeneralProductDetailResponse } from "@/types/products";
import { GeneralProductFormValues } from "@/utils/validation/products/generalProduct";
import { DiscountUnitType } from "@/types/common";

// DTO → form defaultValues 로 변환
export function buildGeneralProductFormValues(
  dto: GeneralProductDetailResponse
): GeneralProductFormValues {
  const {
    itemAdminDto,
    allianceDtoList,
    itemImageAdminDtoList,
    itemOptionAdminDtoList,
    itemContentImageDtoList,
  } = dto;

  return {
    // ▶ 공통 필드
    allianceDtoList,
    contents: itemAdminDto.contents,
    deliveryFree: itemAdminDto.deliveryFree,
    description: itemAdminDto.description,
    discountDegree: itemAdminDto.discountDegree,
    discountType: itemAdminDto.discountType as DiscountUnitType,
    inStock: itemAdminDto.inStock,
    itemHealthType: itemAdminDto.itemHealthType
      .split(",")
      .filter(Boolean) as any,
    itemIcons: itemAdminDto.itemIcons
      ? itemAdminDto.itemIcons.split(",").filter(Boolean)
      : [],
    itemStatus: itemAdminDto.status,
    itemType: itemAdminDto.itemType,
    name: itemAdminDto.name,
    originalPrice: itemAdminDto.originalPrice,
    remaining: itemAdminDto.remaining,
    salePrice: itemAdminDto.salePrice,

    // ▶ 이미지
    // 등록·수정 공통으로 쓰는 imageOrderDtoList
    imageOrderDtoList: itemImageAdminDtoList.map(
      ({ id, leakOrder, url, filename }) => ({
        id,
        leakOrder,
        url,
        filename,
      })
    ),
    // 수정 전용 추가/삭제 리스트 초기값
    addImageIdList: itemImageAdminDtoList.map((i) => i.id),
    deleteImageIdList: [],

    // ▶ 컨텐츠 이미지
    addContentImageIdList: itemContentImageDtoList.map((i) => i.id),
    deleteContentImageIdList: [],

    // ▶ 옵션
    // 신규 옵션 저장
    itemOptionSaveDtoList: [],
    // 기존 옵션(수정) 유지
    itemOptionUpdateDtoList: itemOptionAdminDtoList.map(
      ({ id, name, optionPrice, remaining }) => ({
        id,
        name,
        price: optionPrice,
        remaining,
      })
    ),
    deleteOptionIdList: [],
  };
}
