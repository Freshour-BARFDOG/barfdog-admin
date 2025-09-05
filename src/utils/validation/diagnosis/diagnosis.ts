import { ProductVisibilityStatus } from "@/types/products";
import { DiagnosisKitType } from "@/types/diagnosis";
import * as yup from "yup";

export const diagnosisKitFormSchema = yup.object({
  kitName: yup.string().required(),
  manufacturer: yup.string().required(),
  kitCount: yup.number().min(1).max(100).required(),
  kitType: yup
    .string()
    .oneOf(["PROBIOME"] as const)
    .required() as yup.Schema<DiagnosisKitType>,
});

export type DiagnosisKitFormValues = yup.InferType<
  typeof diagnosisKitFormSchema
>;
export type DiagnosisKitFormKeys = keyof DiagnosisKitFormValues;

export const defaultDiagnosisKitFormValues: DiagnosisKitFormValues = {
  kitName: "",
  manufacturer: "",
  kitCount: 0,
  kitType: "PROBIOME",
};
