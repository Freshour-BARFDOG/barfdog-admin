import * as yup from "yup";
import { numberField } from "../common/common";

export const discountPolicyFormSchema = yup.object({
  full: numberField(),
  half: numberField(),
  topping: numberField(),
});

export type DiscountPolicyFormValues = yup.InferType<
  typeof discountPolicyFormSchema
>;

export const defaultDiscountPolicyFormValues: DiscountPolicyFormValues = {
  full: 0,
  half: 0,
  topping: 0,
};
