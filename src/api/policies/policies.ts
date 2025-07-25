import { AxiosInstance } from "axios";
import axiosInstance from "../axiosInstance";
import {
  AutoCouponResponse,
  OrderDeadline,
  PlanDiscountResponse,
  PolicySettingsResponse,
  UpdateAlgorithmSettingRequest,
  UpdateAutoCouponRequest,
} from "@/types/policies";
import { DiscountPolicyFormValues } from "@/utils/validation/policies/discount";
import { DeliveryFeePolicyFormValues } from "@/utils/validation/policies/delivery";

const getPolicies = async (
  instance: AxiosInstance = axiosInstance
): Promise<PolicySettingsResponse> => {
  const { data } = await instance.get("/api/admin/setting");
  return data;
};

const getAutoCoupons = async (
  instance: AxiosInstance = axiosInstance
): Promise<AutoCouponResponse> => {
  const { data } = await instance.get("/api/admin/coupons/auto/modification");
  return data?._embedded.autoCouponsForUpdateDtoList ?? [];
};

const updateAlgorithmSetting = async ({
  body,
}: {
  body: UpdateAlgorithmSettingRequest;
}) => {
  const { data } = await axiosInstance.post(
    "/api/admin/algorithm/setting",
    body
  );
  return data;
};

const updateCouponPolicy = async ({
  updateAutoCouponRequestDtoList,
}: {
  updateAutoCouponRequestDtoList: UpdateAutoCouponRequest;
}) => {
  const { data } = await axiosInstance.put(
    "/api/admin/coupons/auto/modification",
    updateAutoCouponRequestDtoList
  );
  return data;
};

const updatePlanDiscount = async ({
  body,
}: {
  body: DiscountPolicyFormValues;
}) => {
  const { data } = await axiosInstance.put("/api/admin/planDiscount", body);
  return data;
};

const getPlanDiscount = async (): Promise<PlanDiscountResponse> => {
  const { data } = await axiosInstance.get("/api/planDiscount");

  return data._embedded.planDiscountResponseDtoList[0] || [];
};

const updateDeliveryFeePolicy = async ({
  body,
}: {
  body: DeliveryFeePolicyFormValues;
}) => {
  const { data } = await axiosInstance.post(
    "/api/admin/delivery/setting",
    body
  );
  return data;
};
const updateOrderDeadline = async ({
  orderDeadline,
}: {
  orderDeadline: OrderDeadline;
}) => {
  const { data } = await axiosInstance.put(
    "/api/admin/deadline",
    orderDeadline
  );
  return data;
};

export {
  getPolicies,
  updateAlgorithmSetting,
  getAutoCoupons,
  updateCouponPolicy,
  updatePlanDiscount,
  getPlanDiscount,
  updateDeliveryFeePolicy,
  updateOrderDeadline,
};
