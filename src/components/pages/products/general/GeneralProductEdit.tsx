"use client";
import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useToastStore } from "@/store/useToastStore";
import { useGetGeneralProductDetail } from "@/api/products/queries/useGetGeneralProductDetail";
import { useAllianceOptions } from "@/hooks/useAllianceOptions";
import {
  generalProductFormSchema,
  defaultGeneralProductFormValues,
  GeneralProductFormValues,
} from "@/utils/validation/products/generalProduct";
import { yupResolver } from "@hookform/resolvers/yup";
import { buildGeneralProductFormValues } from "@/utils/products/buildGeneralProductFormValues";
import { useUpdateGeneralProduct } from "@/api/products/mutations/useUpdateGeneralProduct";
import { buildUpdateGeneralPayload } from "@/utils/products/buildGeneralProductPayload";
import GeneralProductForm from "./GeneralProductForm";

interface GeneralProductEditProps {
  itemId: number;
}

export default function GeneralProductEdit({
  itemId,
}: GeneralProductEditProps) {
  const router = useRouter();
  const { data } = useGetGeneralProductDetail(itemId);

  const { addToast } = useToastStore();
  const { mutate } = useUpdateGeneralProduct(itemId);
  const { allianceOptions } = useAllianceOptions();

  const defaultValues = useMemo<GeneralProductFormValues>(() => {
    return data
      ? buildGeneralProductFormValues(data)
      : defaultGeneralProductFormValues;
  }, [data]);

  const form = useForm<GeneralProductFormValues>({
    resolver: yupResolver(generalProductFormSchema),
    defaultValues,
    mode: "all",
  });

  // 페이지에 접근했을때 폼 리셋
  useEffect(() => {
    form.reset(defaultValues);
  }, [itemId, data, form, defaultValues]);

  const onSubmit = async (formValues: GeneralProductFormValues) => {
    const payload = buildUpdateGeneralPayload(formValues);
    mutate(
      { itemId, body: payload },
      {
        onSuccess: async () => {
          addToast("일반 상품 수정이 완료되었습니다");
          router.replace("/products/general");
        },
        onError: () => {
          addToast("일반 상품 수정을 실패했습니다");
        },
      },
    );
  };

  return (
    <GeneralProductForm
      form={form}
      mode="edit"
      allianceOptions={allianceOptions}
      onSubmit={onSubmit}
    />
  );
}
