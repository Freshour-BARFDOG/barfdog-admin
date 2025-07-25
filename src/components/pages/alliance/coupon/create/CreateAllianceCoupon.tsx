"use client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import CreateAllianceCouponForm from "@/components/pages/alliance/coupon/create/form/CreateAllianceCouponForm";
import FormControls from "@/components/common/formControls/FormControls";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useToastStore } from "@/store/useToastStore";
import { AllianceCouponFormValues, AllianceCouponSelectOption } from "@/types/alliance";
import { allianceCouponSchema, defaultAllianceCouponFormValues } from "@/utils/validation/alliance/alliance";
import { useGetAllianceEventList } from "@/api/alliance/queries/useGetAllianceEventList";
import { useCreateAllianceCoupon } from "@/api/alliance/mutations/useCreateAllianceCoupon";
import { downloadBlobFile } from "@/utils/downloadBlobFile";

export default function CreateAllianceCoupon() {
  const router = useRouter();
  const { data: allianceList } = useGetAllianceEventList();

  const {
    control,
    handleSubmit,
    setValue,
    isValid
  } = useFormHandler<AllianceCouponFormValues>(allianceCouponSchema, defaultAllianceCouponFormValues, "all");

  const { addToast } = useToastStore();
  const { mutateAsync } = useCreateAllianceCoupon();

  const onSubmit = async (data: AllianceCouponFormValues) => {
    const body = {
      ...data,
      useStartDate: format(new Date(data.useStartDate), "yyyy-MM-dd'T'HH:mm"),
      useExpiredDate: format(new Date(data.useExpiredDate), "yyyy-MM-dd'T'HH:mm"),
    }
    try {
      const { blob, useStartDate, useExpiredDate, couponPublishCount } =
        await mutateAsync(body);

      if (blob) {
        const formatDateForFilename = (dateStr: string) => format(new Date(dateStr), 'yyyyMMdd');
        const formatStartDate = formatDateForFilename(useStartDate);
        const formatEndDate = formatDateForFilename(useExpiredDate);

        const filename = `바프독_${data.name}_${formatStartDate}_${formatEndDate}_${couponPublishCount.toLocaleString()}건.xlsx`;
        downloadBlobFile(blob, filename);
        addToast('쿠폰 생성이 완료되었습니다!');
      }
    } catch (error) {
      addToast(error as string || '쿠폰 생성 또는 엑셀 다운로드에 실패했습니다.')
      console.error(error);
    }
  };

  return (
    <>
      <CreateAllianceCouponForm
        <AllianceCouponFormValues>
        control={control}
        setValue={setValue}
        allianceList={allianceList as AllianceCouponSelectOption[]}
      />
      <FormControls
        cancelText="목록"
        confirmText="쿠폰 생성"
        onCancel={() => router.push("/alliance/coupon")}
        onConfirm={handleSubmit(onSubmit)}
        isConfirmDisabled={!isValid}
      />
    </>
  );
}
