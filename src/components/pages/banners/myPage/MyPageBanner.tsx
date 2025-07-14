'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { commonWrapper } from "@/styles/common.css";
import { Controller } from "react-hook-form";
import { useFormHandler } from "@/hooks/useFormHandler";
import Card from "@/components/common/card/Card";
import Form from "@/components/common/form/Form";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import Text from "@/components/common/text/Text";
import FileUpload from "@/components/common/fileUpload/FileUpload";
import FormControls from "@/components/common/formContorls/FormControls";
import InputField from "@/components/common/inputField/InputField";
import { BANNER_STATUS_LIST } from "@/constants/banners";
import { queryKeys } from "@/constants/queryKeys";
import { useToastStore } from "@/store/useToastStore";
import { useQueryClient } from "@tanstack/react-query";
import { bannerSchema } from "@/utils/validation/banners/banners";
import { BannerStatus, MyPageBannerFormValues } from "@/types/banners";
import { useGetMyPageBanner } from "@/api/banners/queries/useGetMyPageBanner";
import { useUpdateMyPageBanner } from "@/api/banners/mutations/useUpdateMyPageBanner";

export default function MyPageBanner() {
	const queryClient = useQueryClient();
	const router = useRouter();

	const { data } = useGetMyPageBanner();
	const { mutate } = useUpdateMyPageBanner();
	
	const [pcFile, setPcFile] = useState<File | null>(null);
	const [mobileFile, setMobileFile] = useState<File | null>(null);

	const { addToast } = useToastStore();

	const defaultBannerFormValues = {
		name: data?.name ?? '',
		status: data?.status ?? 'LEAKED' as BannerStatus,
		pcLinkUrl: data?.pcLinkUrl ?? '',
		mobileLinkUrl: data?.mobileLinkUrl ?? '',
	}

	const {
		control,
		handleSubmit,
		isValid,
	} = useFormHandler<MyPageBannerFormValues>(bannerSchema, defaultBannerFormValues, 'all');

	const imageList = [
		{
			title: 'PC',
			label: 'PC 이미지',
			linkName: 'pcLinkUrl',
			defaultImageUrl: data?.thumbnail_pc ?? '',
			imageName: data?.filenamePc ?? '',
			caption: 'PC 이미지 권장사이즈: 1200 x 60',
			width: 1200,
			height: 60,
			onFileChange: setPcFile,
		},
		{
			title: 'Mobile',
			label: 'Mobile 이미지',
			linkName: 'mobileLinkUrl',
			defaultImageUrl: data?.thumbnail_mobile ?? '',
			imageName: data?.filenameMobile ?? '',
			caption: 'PC 이미지 권장사이즈: 600 x 50',
			width: 600,
			height: 50,
			onFileChange: setMobileFile,
		},
	]

	const onSubmit = (formValues: MyPageBannerFormValues) => {
		if(!data) return;

		mutate({
			bannerId: data.id,
			body: formValues,
			pcFile,
			mobileFile,
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_MYPAGE_BANNER],
				});
				setPcFile(null);
				setMobileFile(null);
				addToast('마이페이지 배너 수정이 완료되었습니다!');
			},
			onError: (error) => {
				console.log(error)
				addToast('마이페이지 배너 수정에 실패했습니다.\n관리자에게 문의해주세요.');
			}
		})
	}

	return (
		<>
			<Card shadow='none' padding={20}>
				<Form>
					<Controller
						control={control}
						name='name'
						render={({ field }) => (
							<InputFieldGroup label='배너 이름'>
								<InputField
									{...field}
								/>
							</InputFieldGroup>
						)}
					/>
					<Controller
						control={control}
						name='status'
						render={({ field }) => (
							<InputFieldGroup label='노출 여부'>
								<LabeledRadioButtonGroup
									options={BANNER_STATUS_LIST}
									{...field}
								/>
							</InputFieldGroup>
						)}
					/>
					{imageList.map((image, index) => (
						<div key={image.title} className={commonWrapper({ direction: 'col', gap: 12, align: 'start' })}>
							<Text type='headline2'>{image.title}</Text>
							<InputFieldGroup label={image.label} divider={false}>
								<FileUpload
									inputId={`file-input-${image.title.toLowerCase()}`}
									onFileChange={image.onFileChange}
									defaultImageUrl={image.defaultImageUrl}
									imageName={image.imageName}
									fullWidth={image.title === 'PC'}
									width={image.width}
									height={image.height}
									objectFit='contain'
									caption={image.caption}
								/>
							</InputFieldGroup>
							<Controller
								control={control}
								name={image.linkName as keyof MyPageBannerFormValues}
								render={({ field }) => (
									<InputFieldGroup label='연결 링크' isLabelRequired={false} divider={index === 0}>
										<InputField
											placeholder='ex: https://barfdog.co.kr/path/1'
											{...field}
										/>
									</InputFieldGroup>
								)}
							/>
						</div>
					))}
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