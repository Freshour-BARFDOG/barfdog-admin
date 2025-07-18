import { RecipeRequest } from "@/types/products";
import { RawProductFormValues } from "../validation/products/rawProduct";

export function buildRecipePayload(
  values: RawProductFormValues
): RecipeRequest {
  return {
    name: values.name,
    description: values.description,
    uiNameKorean: values.uiNameKorean,
    uiNameEnglish: values.uiNameEnglish,
    pricePerGram: values.pricePerGram,
    gramPerKcal: values.gramPerKcal,
    ingredients: (values.ingredients ?? []).join(","),
    descriptionForSurvey: values.descriptionForSurvey,
    leaked: values.leaked,
    inStock: values.inStock,
  };
}
