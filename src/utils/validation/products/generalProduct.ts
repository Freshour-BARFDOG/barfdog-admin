import * as yup from "yup";
import { DiscountUnitType } from "@/types/common";
import {
  GeneralProductCreateType,
  ItemHealthType,
  ProductVisibilityStatus,
} from "@/types/products";
import { ITEM_HEALTH_TYPE_KEYS } from "@/constants/products";

export const generalProductFormSchema = yup.object({
  allianceDtoList: yup
    .array()
    .of(
      yup.object({
        allianceId: yup.number().required(),
        allianceDegree: yup
          .number()
          .min(0)
          .when("allianceDiscountType", {
            is: "FIXED_RATE" as DiscountUnitType,
            then: (sch) => sch.max(100),
          })
          .required(),
        allianceDiscountType: yup
          .mixed<DiscountUnitType>()
          .oneOf(["FLAT_RATE", "FIXED_RATE"])
          .required(),
        allianceSalePrice: yup.number().min(0).required(),
      })
    )
    .notRequired(),
  contents: yup.string().required(),
  deliveryFree: yup.boolean().required(),
  description: yup.string().required(),
  discountDegree: yup
    .number()
    .min(0)
    .when("discountType", {
      is: "FIXED_RATE" as DiscountUnitType,
      then: (sch) => sch.max(100),
    })
    .required(),
  discountType: yup
    .mixed<DiscountUnitType>()
    .oneOf(["FLAT_RATE", "FIXED_RATE"])
    .required(),
  inStock: yup.boolean().required(),
  itemHealthType: yup
    .array()
    .of(
      yup
        .mixed<ItemHealthType>()
        .oneOf(ITEM_HEALTH_TYPE_KEYS, "유효한 건강 타입이어야 합니다.")
    )
    .notRequired(),
  itemIcons: yup.array().of(yup.string()).notRequired(),
  itemStatus: yup
    .mixed<ProductVisibilityStatus>()
    .oneOf(["LEAKED", "HIDDEN"])
    .required(),
  itemType: yup
    .mixed<GeneralProductCreateType>()
    .oneOf(["RAW", "COOKED", "TOPPING", "SNACK", "ETC"])
    .required(),
  name: yup.string().required(),
  originalPrice: yup.number().min(0).required(),
  remaining: yup.number().min(0).required(),
  salePrice: yup.number().min(0).required(),
  // 상품 이미지 추가 - itemImageOrderDtoList(등록) / imageOrderDtoList(수정) => 통일
  imageOrderDtoList: yup
    .array()
    .of(
      yup.object({
        id: yup.number().required(),
        leakOrder: yup.number().min(1).required(),
        url: yup.string().required(),
      })
    )
    .required(),
  // 상품 이미지 추가(수정)
  addImageIdList: yup
    .array()
    .of(yup.number().required())
    .min(1, "최소 1개의 상품 이미지를 등록해야 합니다.")
    .required("상품 이미지를 반드시 등록해야 합니다."),
  // contents 이미지 추가 - contentImageIdList(등록) / addContentImageIdList(수정) => 통일
  addContentImageIdList: yup.array().of(yup.number().required()).notRequired(),
  // 상품 이미지 삭제(수정)
  deleteImageIdList: yup.array().of(yup.number().required()).notRequired(),
  deleteContentImageIdList: yup
    .array()
    .of(yup.number().required())
    .notRequired(),

  // 옵션 추가(등록, 수정)
  itemOptionSaveDtoList: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required(),
        price: yup.number().min(0).required(),
        remaining: yup.number().min(0).required(),
      })
    )
    .required(),
  // 변경되지 않은 옵션(수정)
  itemOptionUpdateDtoList: yup
    .array()
    .of(
      yup.object({
        id: yup.number().required(),
        name: yup.string().required(),
        price: yup.number().min(0).required(),
        remaining: yup.number().min(0).required(),
      })
    )
    .required(),
  // 옵션 삭제(수정)
  deleteOptionIdList: yup.array().of(yup.number().required()).notRequired(),
});

export type GeneralProductFormValues = yup.InferType<
  typeof generalProductFormSchema
>;
export type GeneralProductFormKeys = keyof GeneralProductFormValues;

export const defaultGeneralProductFormValues: GeneralProductFormValues = {
  allianceDtoList: [],
  addContentImageIdList: [],
  deleteContentImageIdList: [],
  addImageIdList: [],
  deleteImageIdList: [],
  deleteOptionIdList: [],
  contents: "",
  deliveryFree: true,
  description: "",
  discountDegree: 0,
  discountType: "FLAT_RATE",
  inStock: true,
  itemHealthType: [],
  itemIcons: [],
  itemStatus: "LEAKED",
  itemType: "RAW",
  name: "",
  originalPrice: 0,
  remaining: 0,
  salePrice: 0,
  imageOrderDtoList: [],
  itemOptionSaveDtoList: [],
  itemOptionUpdateDtoList: [],
};
