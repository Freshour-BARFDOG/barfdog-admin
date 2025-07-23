import { DogGender, Page } from "./common";

interface DogListRequest {
  memberName: string;
  dogName: string;
  memberEmail: string;
  subscribeStatus: "ALL" | "SUBSCRIBING" | "NONSUBSCRIBING";
  isDeleted: string;
}

interface DogListParams {
  body: DogListRequest;
  page?: number;
  size?: number;
}

interface DefaultAddress {
  deliveryName: string | null;
  zipcode: string;
  city: string;
  street: string;
  detailAddress: string;
}

interface DogDto {
  memberId: number;
  memberName: string;
  email: string;
  defaultAddress: DefaultAddress;
  phoneNumber: string;
  memberBirthday: string;
  subscribe: boolean;
  withdrawal: boolean;
  dogId: number;
  dogName: string;
  dogGender: DogGender;
  dogBirth: string;
  oldDog: boolean;
  representative: boolean;
  dogType: string;
  dogSize: string;
  weight: number;
  neutralization: boolean;
  activityLevel: string;
  walkingCountPerWeek: number;
  walkingTimePerOneTime: number;
  dogStatus: string;
  snackCountLevel: string;
  inedibleFood: string;
  inedibleFoodEtc: string;
  caution: string;
  startAgeMonth: number;
  subscribeId: number;
  subscribeStatus: string;
  subscribeCount: number;
  plan: string | null;
  oneMealGramsPerRecipe: number | null;
  oneDayRecommendKcal: number;
  deleted: boolean;
}

type DogList = DogDto[];

interface DogListResponse {
  dogs: DogList;
  page: Page;
}

interface DogDetailDto {
  id: number;
  name: string;
  gender: DogGender;
  birth: string;
  oldDog: boolean;
  dogType: string;
  dogSize: string;
  weight: string;
  neutralization: boolean;
  activityLevel: string;
  walkingCountPerWeek: string;
  walkingTimePerOneTime: string;
  dogStatus: string;
  specificDogStatus: string;
  specificDogStatusEtc: string;
  expectedPregnancyDay: string | null;
  snackCountLevel: string;
  waterCountLevel: string;
  supplement: string;
  supplementEtc: string;
  currentMeal: string;
  inedibleFood: string;
  inedibleFoodEtc: string;
  caution: string;
  cautionEtc: string;
  priorityConcerns: string | null;
  newToRawDiet: boolean;
  recommendRecipeId: number;
  oneMealRecommendGram: number;
  memberId: number;
  subscribeId: number;
}

interface RecipeDto {
  id: number;
  descriptionForSurvey: string;
  ingredients: string[];
}

interface DogDetailResponse {
  dogDto: DogDetailDto;
  recipeDtoList: RecipeDto[];
  recipes: string[];
  ingredients: string[];
  plan: string | null;
}

type DogsCategory = Omit<DogListRequest, "subscribeStatus" | "isDeleted">;
type DogsSubscribeStatus = "ALL" | "SUBSCRIBING" | "NONSUBSCRIBING";

export type {
  DogListRequest,
  DogListParams,
  DogList,
  DogDto,
  DefaultAddress,
  DogListResponse,
  DogDetailDto,
  DogDetailResponse,
  DogsCategory,
  DogsSubscribeStatus,
};
