'use client';
import { useRouter } from "next/navigation";
import { Controller, useWatch } from "react-hook-form";
import { useFormHandler } from "@/hooks/useFormHandler";
import Card from "@/components/common/card/Card";
import Form from "@/components/common/form/Form";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import FormControls from "@/components/common/formControls/FormControls";
import PreviewBanner from "@/components/pages/banners/top/previewBanner/PreviewBanner";
import SimpleTextEditor from "@/components/pages/banners/top/simpleTextEditor/SimpleTextEditor";
import InputField from "@/components/common/inputField/InputField";
import { STATUS_LIST } from "@/constants/common";
import { queryKeys } from "@/constants/queryKeys";
import { useToastStore } from "@/store/useToastStore";
import { useQueryClient } from "@tanstack/react-query";
import { bannerSchema } from "@/utils/validation/banners/banners";
import { TopBannerFormValues } from "@/types/banners";
import { StatusType } from "@/types/common";
import { useGetTopBanner } from "@/api/banners/queries/useGetTopBanner";
import { useUpdateTopBanner } from "@/api/banners/mutations/useUpdateTopBanner";

export default function TopBanner() {
	const queryClient = useQueryClient();
	const router = useRouter();

	const { data } = useGetTopBanner();

	const defaultBannerFormValues = {
		name: data?.name ?? '',
		status: data?.status ?? 'LEAKED' as StatusType,
		backgroundColor: data?.backgroundColor ?? '',
		fontColor: data?.fontColor ?? '',
		mobileLinkUrl: data?.mobileLinkUrl ?? '',
		pcLinkUrl: data?.pcLinkUrl ?? '',
	} as TopBannerFormValues;

	const {
		control,
		handleSubmit,
		isValid,
	} = useFormHandler<TopBannerFormValues>(bannerSchema, defaultBannerFormValues, 'all');

	const name = useWatch({ control, name: "name" });
	const backgroundColor = useWatch({ control, name: "backgroundColor" });
	const fontColor = useWatch({ control, name: "fontColor" });

	const { mutate } = useUpdateTopBanner();
	const { addToast } = useToastStore();

	const onSubmit = (formValues: TopBannerFormValues) => {
		if(!data) return;

		mutate({
			bannerId: data.id,
			body: formValues,
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_TOP_BANNER],
				});
				addToast('최상단 띠 배너 수정이 완료되었습니다!');
			},
			onError: (error) => {
				console.log(error)
				addToast('최상단 띠 배너 수정에 실패했습니다.\n관리자에게 문의해주세요.');
			}
		})
	}
	return (
		<>
			<Card shadow='none' padding={20}>
				<Form>
					<Controller
						control={control}
						name="name"
						render={({ field }) => (
							<InputFieldGroup label="배너 이름">
								<SimpleTextEditor
									value={field.value}
									onChange={field.onChange}
								/>
							</InputFieldGroup>
						)}
					/>
					<Controller
						control={control}
						name="fontColor"
						render={({ field }) => (
							<InputFieldGroup label="글자색">
								<div>
									<InputField
										{...field}
									/>
								</div>
								<input type="color" {...field} />
							</InputFieldGroup>
						)}
					/>
					<Controller
						control={control}
						name="backgroundColor"
						render={({ field }) => (
							<InputFieldGroup label="배경색">
								<div>
									<InputField
										{...field}
									/>
								</div>
								<input type="color" {...field} />
							</InputFieldGroup>
						)}
					/>
					<Controller
						control={control}
						name='pcLinkUrl'
						render={({ field }) => (
							<InputFieldGroup label='연결 링크(PC)'>
								<InputField {...field} />
							</InputFieldGroup>
						)}
					/>
					<Controller
						control={control}
						name='mobileLinkUrl'
						render={({ field }) => (
							<InputFieldGroup label='연결 링크(PC)'>
								<InputField {...field} />
							</InputFieldGroup>
						)}
					/>
					<Controller
						control={control}
						name='status'
						render={({ field }) => (
							<InputFieldGroup label='노출 여부'>
								<LabeledRadioButtonGroup
									options={STATUS_LIST}
									{...field}
								/>
							</InputFieldGroup>
						)}
					/>
					<InputFieldGroup label='미리보기'>
						<PreviewBanner
							htmlText={name}
							height={38}
							backgroundColor={backgroundColor}
							fontColor={fontColor}
						/>
					</InputFieldGroup>

				</Form>
			</Card>
			<FormControls
				confirmText='등록'
				cancelText='취소'
				onConfirm={handleSubmit(onSubmit)}
				onCancel={() => router.back()}
				isConfirmDisabled={!isValid}
			/>
		</>
	);
}