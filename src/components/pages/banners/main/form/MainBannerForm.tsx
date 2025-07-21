'use client';
import { commonWrapper } from "@/styles/common.css";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import Card from "@/components/common/card/Card";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import Text from "@/components/common/text/Text";
import InputField from "@/components/common/inputField/InputField";
import Form from "@/components/common/form/Form";
import FormControls from "@/components/common/formControls/FormControls";
import FileUpload from "@/components/common/fileUpload/FileUpload";
import { useFormHandler } from "@/hooks/useFormHandler";
import { MainBannerFormValues } from "@/types/banners";
import { defaultMainBannerFormValues, mainBannerSchema } from "@/utils/validation/banners/banners";
import { BANNER_TARGET_LIST } from "@/constants/banners";
import { STATUS_LIST } from "@/constants/common";

interface MainBannerFormProps {
	onSubmit: (data: MainBannerFormValues) => void;
	defaultUpdateFormValue?: MainBannerFormValues | null;
	setPcFile: (file: File | null) => void;
	setMobileFile: (file: File | null) => void;
	isValidFiles: boolean;
}

export default function MainBannerForm({
	onSubmit,
	defaultUpdateFormValue = null,
	setPcFile,
	setMobileFile,
	isValidFiles = false,
}: MainBannerFormProps) {
	const router = useRouter();

	const {
		control,
		handleSubmit,
		isValid,
	} = useFormHandler<MainBannerFormValues>(mainBannerSchema, defaultUpdateFormValue ?? defaultMainBannerFormValues, 'all');

	const imageList = [
		{
			title: 'PC',
			label: 'PC 이미지',
			linkName: 'pcLinkUrl',
			defaultImageUrl: defaultUpdateFormValue?.thumbnail_pc ?? '',
			imageName: defaultUpdateFormValue?.filenamePc ?? '',
			caption: 'PC 이미지 권장사이즈: 1920 x 400',
			width: 1920,
			height: 400,
			onFileChange: setPcFile,
		},
		{
			title: 'Mobile',
			label: 'Mobile 이미지',
			linkName: 'mobileLinkUrl',
			defaultImageUrl: defaultUpdateFormValue?.thumbnail_mobile ?? '',
			imageName: defaultUpdateFormValue?.filenameMobile ?? '',
			caption: 'PC 이미지 권장사이즈: 600 x 600',
			width: 300,
			height: 300,
			onFileChange: setMobileFile,
		},
	]
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
						name='targets'
						render={({ field }) => (
							<InputFieldGroup label='노출 대상'>
								<LabeledRadioButtonGroup
									options={BANNER_TARGET_LIST}
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
									options={STATUS_LIST}
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
								name={image.linkName as keyof MainBannerFormValues}
								render={({ field }) => (
									<>
										<InputFieldGroup label='연결 링크' isLabelRequired={false} divider={index === 0}>
											<div className={commonWrapper({ width: 'full', direction: 'col', gap: 4, align: 'start' })}>
												<InputField
													placeholder='ex: https://barfdog.co.kr/path/1'
													{...field}
												/>
												<Text type='caption' color='gray500'>* 링크가 없을 경우, 배너 클릭 이벤트가 발생하지 않습니다.</Text>
											</div>
										</InputFieldGroup>
									</>
								)}
							/>
						</div>
					))}
				</Form>
			</Card>
			<FormControls
				cancelText={defaultUpdateFormValue ? '목록' : '취소'}
				confirmText={defaultUpdateFormValue ? '수정' : '등록'}
				onCancel={() => router.back()}
				onConfirm={() => {
					handleSubmit(onSubmit)();
				}}
				isConfirmDisabled={!isValidFiles || !isValid}
			/>
		</>
	);
}