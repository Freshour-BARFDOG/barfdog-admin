import * as yup from "yup";

export const algorithmSettingFormSchema = yup.object({
  activityConstant: yup.object({
    activityVeryLittle: yup.number().required(),
    activityLittle: yup.number().required(),
    activityNormal: yup.number().required(),
    activityMuch: yup.number().required(),
    activityVeryMuch: yup.number().required(),
  }),
  snackConstant: yup.object({
    snackLittle: yup.number().required(),
    snackNormal: yup.number().required(),
    snackMuch: yup.number().required(),
  }),
  standardVar: yup.object({
    youngDog: yup.number().required(),
    oldDog: yup.number().required(),
    neutralizationFalse: yup.number().required(),
    neutralizationTrue: yup.number().required(),
    needDiet: yup.number().required(),
    obesity: yup.number().required(),
    pregnant: yup.number().required(),
    lactating: yup.number().required(),
  }),
});

export type AlgorithmSettingFormValues = yup.InferType<
  typeof algorithmSettingFormSchema
>;

export const defaultAlgorithmSettingFormValues: AlgorithmSettingFormValues = {
  activityConstant: {
    activityVeryLittle: 0,
    activityLittle: 0,
    activityNormal: 0,
    activityMuch: 0,
    activityVeryMuch: 0,
  },
  snackConstant: {
    snackLittle: 0,
    snackNormal: 0,
    snackMuch: 0,
  },
  standardVar: {
    youngDog: 0,
    oldDog: 0,
    neutralizationFalse: 0,
    neutralizationTrue: 0,
    needDiet: 0,
    obesity: 0,
    pregnant: 0,
    lactating: 0,
  },
};
