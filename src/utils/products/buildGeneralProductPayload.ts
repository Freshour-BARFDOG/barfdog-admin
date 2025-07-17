import {
  CreateGeneralProductRequest,
  UpdateGeneralProductRequest,
} from "@/types/products";
import { GeneralProductFormValues } from "../validation/products/generalProduct";

export function buildCreateGeneralPayload(
  values: GeneralProductFormValues
): CreateGeneralProductRequest {
  return {
    allianceDtoList: values.allianceDtoList ?? [],
    contents: values.contents,
    deliveryFree: values.deliveryFree,
    description: values.description,
    discountDegree: values.discountDegree,
    discountType: values.discountType,
    inStock: values.inStock,
    itemStatus: values.itemStatus,
    itemType: values.itemType,
    name: values.name,
    originalPrice: values.originalPrice,
    remaining: values.remaining,
    salePrice: values.salePrice,
    contentImageIdList: values.addContentImageIdList ?? [],
    itemImageOrderDtoList: values.imageOrderDtoList.map(
      ({ id, leakOrder }) => ({
        id,
        leakOrder,
      })
    ),
    itemOptionSaveDtoList: values.itemOptionSaveDtoList,
    // 배열 → comma 문자열로 변환
    itemHealthType: (values.itemHealthType ?? []).join(","),
    itemIcons: (values.itemIcons ?? []).join(","),
  };
}

export function buildUpdateGeneralPayload(
  values: GeneralProductFormValues
): UpdateGeneralProductRequest {
  return {
    allianceDtoList: values.allianceDtoList ?? [],
    contents: values.contents,
    deliveryFree: values.deliveryFree,
    description: values.description,
    discountDegree: values.discountDegree,
    discountType: values.discountType,
    inStock: values.inStock,
    itemStatus: values.itemStatus,
    itemType: values.itemType,
    name: values.name,
    originalPrice: values.originalPrice,
    remaining: values.remaining,
    salePrice: values.salePrice,
    // 수정 전용 이미지 ID 관리
    addContentImageIdList: values.addContentImageIdList ?? [],
    deleteContentImageIdList: values.deleteContentImageIdList ?? [],
    addImageIdList: values.addImageIdList ?? [],
    deleteImageIdList: values.deleteImageIdList ?? [],
    // 이미지 순서
    imageOrderDtoList: values.imageOrderDtoList.map(({ id, leakOrder }) => ({
      id,
      leakOrder,
    })),
    // 옵션
    itemOptionSaveDtoList: values.itemOptionSaveDtoList,
    itemOptionUpdateDtoList: values.itemOptionUpdateDtoList,
    deleteOptionIdList: values.deleteOptionIdList ?? [],
    // 배열 → comma 문자열로 변환
    itemHealthType: (values.itemHealthType ?? []).join(","),
    itemIcons: (values.itemIcons ?? []).join(","),
  };
}
