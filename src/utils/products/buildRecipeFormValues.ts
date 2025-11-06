import { RawProductFormValues } from "@/utils/validation/products/rawProduct";
import { RecipeDetailResponse } from "@/types/products";

export function buildRecipeFormValues(
  dto: RecipeDetailResponse
): RawProductFormValues {
  return {
    name: dto.name,
    description: dto.description,
    uiNameKorean: dto.uiNameKorean,
    uiNameEnglish: dto.uiNameEnglish,
    pricePerGram: dto.pricePerGram,
    gramPerKcal: dto.gramPerKcal,
    ingredients: dto.ingredientList,
    descriptionForSurvey: dto.descriptionForSurvey,
    leaked: dto.leaked,
    inStock: dto.inStock,
  };
}
