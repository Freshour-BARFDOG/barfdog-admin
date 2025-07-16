import { CreateGeneralProductRequest } from "@/types/products";
import { CreateGeneralValues } from "../validation/products/generalProduct";

export function buildCreateGeneralPayload(
  values: CreateGeneralValues
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
    contentImageIdList: values.contentImageIdList,
    itemImageOrderDtoList: values.itemImageOrderDtoList,
    itemOptionSaveDtoList: values.itemOptionSaveDtoList,
    // 배열 → comma 문자열로 변환
    itemHealthType: (values.itemHealthType ?? []).join(","),
    itemIcons: (values.itemIcons ?? []).join(","),
  };
}
