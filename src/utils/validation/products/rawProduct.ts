import { ProductVisibilityStatus } from "@/types/products";
import * as yup from "yup";

export const rawProductFormSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  uiNameKorean: yup.string().required(),
  uiNameEnglish: yup.string().required(),
  pricePerGram: yup.number().min(0).required(),
  gramPerKcal: yup.number().min(0).required(),
  ingredients: yup
    .array()
    .of(yup.string().required("재료를 선택해주세요"))
    .min(1, "최소 하나 이상의 재료를 선택해주세요")
    .required(),
  descriptionForSurvey: yup.string().required(),
  leaked: yup
    .mixed<ProductVisibilityStatus>()
    .oneOf(["LEAKED", "HIDDEN"])
    .required(),
  inStock: yup.boolean().required(),
});

export type RawProductFormValues = yup.InferType<typeof rawProductFormSchema>;
export type RawProductFormKeys = keyof RawProductFormValues;

export const defaultRawProductFormValues: RawProductFormValues = {
  name: "",
  description: "",
  uiNameKorean: "",
  uiNameEnglish: "",
  pricePerGram: 0,
  gramPerKcal: 0,
  ingredients: [],
  descriptionForSurvey: "",
  leaked: "LEAKED",
  inStock: true,
};
