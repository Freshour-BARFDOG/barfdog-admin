"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { buildRecipeFormValues } from "@/utils/products/buildRecipeFormValues";
import {
  RawProductFormValues,
  defaultRawProductFormValues,
  rawProductFormSchema,
} from "@/utils/validation/products/rawProduct";
import { useGetIngredientList } from "@/api/products/queries/useGetIngredientList";
import RawProductForm from "./RawProductForm";
import { useGetRecipeDetail } from "@/api/products/queries/useGetRecipeDetail";
import { useUpdateRecipe } from "@/api/products/mutations/useUpdateRecipe";
import { buildRecipePayload } from "@/utils/products/buildRecipePayload";
import { useToastStore } from "@/store/useToastStore";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {
  recipeId: number;
}
export default function RawProductEdit({ recipeId }: Props) {
  const router = useRouter();
  const { addToast } = useToastStore();
  const { data } = useGetRecipeDetail(recipeId);

  const defaultValues = useMemo<RawProductFormValues>(() => {
    return data ? buildRecipeFormValues(data) : defaultRawProductFormValues;
  }, [data]);
  const form = useForm<RawProductFormValues>({
    resolver: yupResolver(rawProductFormSchema),
    defaultValues,
    mode: "all",
  });

  const { mutate: updateRecipe } = useUpdateRecipe(recipeId);
  const [surveyFile, setSurveyFile] = useState<File | null>(null);
  const [recipeFile, setRecipeFile] = useState<File | null>(null);

  // 페이지에 접근했을때 폼 리셋
  useEffect(() => {
    form.reset(defaultValues);
  }, [recipeId, data, form, defaultValues]);

  const onSubmit = (data: RawProductFormValues) => {
    const body = buildRecipePayload(data);
    updateRecipe(
      { recipeId, body, surveyFile, recipeFile },
      {
        onSuccess: () => {
          addToast("레시피 수정에 성공했습니다");
          router.push("/products/raw");
        },
        onError: () => {
          addToast("레시피 수정에 성공했습니다");
        },
      }
    );
  };

  return (
    <RawProductForm
      form={form}
      defaultSurveyUrl={data?.thumbnailUri2}
      defaultRecipeUrl={data?.thumbnailUri1}
      surveyFileName={data?.filename2}
      recipeFileName={data?.filename1}
      recipeFile={recipeFile}
      surveyFile={surveyFile}
      onSurveyFileChange={setSurveyFile}
      onRecipeFileChange={setRecipeFile}
      onSubmit={onSubmit}
    />
  );
}
