import * as yup from "yup";
import { DiscountUnitType } from "@/types/common";
import {
  GeneralProductCreateType,
  ItemHealthType,
  ProductVisibilityStatus,
} from "@/types/products";
import { ITEM_HEALTH_TYPE_KEYS } from "@/constants/products";

const baseProductFields = {
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
    .required(),
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
};

/** 2) 만들기(Create) 전용 스키마 */
export const createGeneralSchema = yup.object({
  ...baseProductFields,
  contentImageIdList: yup.array().of(yup.number().required()).required(),
  itemImageOrderDtoList: yup
    .array()
    .of(
      yup.object({
        id: yup.number().required(),
        leakOrder: yup.number().min(1).required(),
      })
    )
    .required(),
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
});

/** 3) 수정(Update) 전용 스키마 */
export const updateGeneralSchema = yup.object({
  ...baseProductFields,
  addContentImageIdList: yup.array().of(yup.number().required()).required(),
  deleteContentImageIdList: yup.array().of(yup.number().required()).required(),
  addImageIdList: yup.array().of(yup.number().required()).required(),
  deleteImageIdList: yup.array().of(yup.number().required()).required(),
  deleteOptionIdList: yup.array().of(yup.number().required()).required(),
  imageOrderDtoList: yup
    .array()
    .of(
      yup.object({
        id: yup.number().required(),
        leakOrder: yup.number().min(1).required(),
      })
    )
    .required(),
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
});

export type CreateGeneralValues = yup.InferType<typeof createGeneralSchema>;
export type CreateGeneralKeys = keyof CreateGeneralValues;

export type UpdateGeneralValues = yup.InferType<typeof updateGeneralSchema>;
export type UpdateGeneralKeys = keyof UpdateGeneralValues;

export const defaultCreateGeneralValues: CreateGeneralValues = {
  allianceDtoList: [],
  contentImageIdList: [],
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
  itemImageOrderDtoList: [],
  itemOptionSaveDtoList: [],
};

export const defaultUpdateGeneralValues: UpdateGeneralValues = {
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
