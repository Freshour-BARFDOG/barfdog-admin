// components/GeneralProductCreate.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useToastStore } from "@/store/useToastStore";
import { useGetAllianceList } from "@/api/products/queries/useGetAllianceList";
import { useCreateGeneralProduct } from "@/api/products/mutations/useCreateGeneralProduct";
import {
  defaultGeneralProductFormValues,
  generalProductFormSchema,
  GeneralProductFormValues,
} from "@/utils/validation/products/generalProduct";
import { yupResolver } from "@hookform/resolvers/yup";
import GeneralProductForm from "./GeneralProductForm";
import { buildCreateGeneralPayload } from "@/utils/products/buildGeneralProductPayload";

export default function GeneralProductCreate() {
  const router = useRouter();
  const { data: allianceData } = useGetAllianceList();
  const { addToast } = useToastStore();
  const { mutate } = useCreateGeneralProduct();

  const form = useForm<GeneralProductFormValues>({
    resolver: yupResolver(generalProductFormSchema),
    defaultValues: defaultGeneralProductFormValues,
    mode: "all",
  });

  const onSubmit = (formValues: GeneralProductFormValues) => {
    const payload = buildCreateGeneralPayload(formValues);
    mutate(payload, {
      onSuccess: async () => {
        addToast("일반 상품 등록이 완료되었습니다");
        // router.push("/products/general");
      },
      onError: () => {
        addToast("일반 상품 등록을 실패했습니다");
      },
    });
  };

  return (
    <GeneralProductForm
      form={form}
      mode="create"
      allianceOptions={(allianceData ?? []).map((a) => ({
        value: a.allianceId,
        label: a.allianceName,
      }))}
      onSubmit={onSubmit}
    />
  );
}
