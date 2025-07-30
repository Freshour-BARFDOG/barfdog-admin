import { UpdateAlgorithmSettingRequest } from "@/types/policies";
import { AlgorithmSettingFormValues } from "../validation/policies/algorithm";

export function buildAlgorithmSettingPayload(
  values: AlgorithmSettingFormValues
): UpdateAlgorithmSettingRequest {
  const {
    activityConstant: {
      activityVeryLittle,
      activityLittle,
      activityNormal,
      activityMuch,
      activityVeryMuch,
    },
    snackConstant: { snackLittle, snackNormal, snackMuch },
    standardVar: {
      youngDog,
      oldDog,
      neutralizationFalse,
      neutralizationTrue,
      needDiet,
      obesity,
      pregnant,
      lactating,
    },
  } = values;

  return {
    activityVeryLittle,
    activityLittle,
    activityNormal,
    activityMuch,
    activityVeryMuch,
    snackLittle,
    snackNormal,
    snackMuch,
    youngDog,
    oldDog,
    neutralizationFalse,
    neutralizationTrue,
    needDiet,
    obesity,
    pregnant,
    lactating,
  };
}
