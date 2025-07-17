// components/GeneralProductEdit.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useToastStore } from "@/store/useToastStore";
import { useGetGeneralProductDetail } from "@/api/products/queries/useGetGeneralProductDetail";
import { useGetAllianceList } from "@/api/products/queries/useGetAllianceList";
import {
  generalProductFormSchema,
  defaultGeneralProductFormValues,
  GeneralProductFormValues,
} from "@/utils/validation/products/generalProduct";
import { yupResolver } from "@hookform/resolvers/yup";
import GeneralProductForm from "./GeneralProductForm";
import { mapDtoToGeneralProductFormValues } from "@/utils/products/mapDtoToGeneralProductFormValues";
import { useUpdateGeneralProduct } from "@/api/products/mutations/useUpdateGeneralProduct";
import { buildUpdateGeneralPayload } from "@/utils/products/buildGeneralProductPayload";

interface GeneralProductEditProps {
  itemId: number;
}

export default function GeneralProductEdit({
  itemId,
}: GeneralProductEditProps) {
  const router = useRouter();
  const { data } = useGetGeneralProductDetail(itemId);
  console.log("data", data);

  const { addToast } = useToastStore();
  const { mutate } = useUpdateGeneralProduct();
  const { data: allianceData } = useGetAllianceList();

  const initial = data
    ? mapDtoToGeneralProductFormValues(data)
    : defaultGeneralProductFormValues;

  const form = useForm<GeneralProductFormValues>({
    resolver: yupResolver(generalProductFormSchema),
    defaultValues: initial,
    mode: "all",
  });

  const onSubmit = async (formValues: GeneralProductFormValues) => {
    const payload = buildUpdateGeneralPayload(formValues);
    mutate(
      { itemId, body: payload },
      {
        onSuccess: async () => {
          addToast("일반 상품 수정이 완료되었습니다");
          // router.push("/products/general");
        },
        onError: () => {
          addToast("일반 상품 수정을 실패했습니다");
        },
      }
    );
  };

  return (
    <GeneralProductForm
      form={form}
      mode="edit"
      allianceOptions={(allianceData ?? []).map((a) => ({
        value: a.allianceId,
        label: a.allianceName,
      }))}
      onSubmit={onSubmit}
    />
  );
}
