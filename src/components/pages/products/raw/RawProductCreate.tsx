"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  RawProductFormValues,
  defaultRawProductFormValues,
  rawProductFormSchema,
} from "@/utils/validation/products/rawProduct";
import { useCreateRecipe } from "@/api/products/mutations/useCreateRecipe";
import { buildRecipePayload } from "@/utils/products/buildRecipePayload";
import RawProductForm from "./RawProductForm";
import { useToastStore } from "@/store/useToastStore";
import { yupResolver } from "@hookform/resolvers/yup";

export default function RawProductCreate() {
  const router = useRouter();
  const { addToast } = useToastStore();
  const form = useForm<RawProductFormValues>({
    resolver: yupResolver(rawProductFormSchema),
    defaultValues: defaultRawProductFormValues,
    mode: "all",
  });

  const { mutate: createRecipe } = useCreateRecipe();
  const [recipeFile, setRecipeFile] = useState<File | null>(null);
  const [surveyFile, setSurveyFile] = useState<File | null>(null);

  const onSubmit = (data: RawProductFormValues) => {
    if (!surveyFile || !recipeFile) {
      addToast("두 썸네일 모두 등록해주세요.");
      return;
    }
    const body = buildRecipePayload(data);

    createRecipe(
      { body, recipeFile, surveyFile },
      {
        onSuccess: () => {
          addToast("레시피 등록에 성공했습니다");
          router.push("/products/raw");
        },
        onError: () => {
          addToast("레시피 등록에 실패했습니다");
        },
      }
    );
  };

  return (
    <RawProductForm
      form={form}
      onSurveyFileChange={setSurveyFile}
      onRecipeFileChange={setRecipeFile}
      recipeFile={recipeFile}
      surveyFile={surveyFile}
      onSubmit={onSubmit}
    />
  );
}
