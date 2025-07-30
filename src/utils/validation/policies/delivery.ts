import * as yup from "yup";
import { numberField } from "../common/common";

export const deliveryFeePolicyFormSchema = yup.object({
  freeCondition: numberField(),
  price: numberField(),
});

export type DeliveryFeePolicyFormValues = yup.InferType<
  typeof deliveryFeePolicyFormSchema
>;

export const defaultDeliveryFeePolicyFormValues: DeliveryFeePolicyFormValues = {
  freeCondition: 0,
  price: 0,
};
