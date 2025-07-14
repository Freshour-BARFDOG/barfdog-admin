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
import FormControls from "@/components/common/formContorls/FormControls";
import FileUpload from "@/components/common/fileUpload/FileUpload";
import { useFormHandler } from "@/hooks/useFormHandler";
import { MainBannerFormValues, PopupFormValues } from "@/types/banners";
import {
	defaultPopupFormValues,
	popupSchema
} from "@/utils/validation/banners/banners";
import { BANNER_STATUS_LIST, POPUP_POSITION_LIST } from "@/constants/banners";

interface PopupFormProps {
	onSubmit: (data: PopupFormValues) => void;
	defaultUpdateFormValue?: PopupFormValues | null;
	setPcFile: (file: File | null) => void;
	setMobileFile: (file: File | null) => void;
	isValidFiles: boolean;
}

export default function PopupForm({
	onSubmit,
	defaultUpdateFormValue = null,
	setPcFile,
	setMobileFile,
	isValidFiles = false,
}: PopupFormProps) {
	const router = useRouter();

	const {
		control,
		handleSubmit,
		isValid,
	} = useFormHandler<PopupFormValues>(popupSchema, defaultUpdateFormValue ?? defaultPopupFormValues, 'all');

	const imageList = [
		{
			title: 'PC',
			label: 'PC 이미지',
			linkName: 'pcLinkUrl',
			defaultImageUrl: defaultUpdateFormValue?.thumbnail_pc ?? '',
			imageName: defaultUpdateFormValue?.filenamePc ?? '',
			caption: 'PC 이미지 권장사이즈: 600 x 600',
			width: 300,
			height: 300,
			onFileChange: setPcFile,
		},
		{
			title: 'Mobile',
			label: 'Mobile 이미지',
			linkName: 'mobileLinkUrl',
			defaultImageUrl: defaultUpdateFormValue?.thumbnail_mobile ?? '',
			imageName: defaultUpdateFormValue?.filenameMobile ?? '',
			caption: 'PC 이미지 권장사이즈: 560 x 560',
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
							<InputFieldGroup label='팝업 이름'>
								<InputField
									{...field}
								/>
							</InputFieldGroup>
						)}
					/>
					<Controller
						control={control}
						name='position'
						render={({ field }) => (
							<InputFieldGroup label='팝업 위치'>
								<LabeledRadioButtonGroup
									options={POPUP_POSITION_LIST}
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
									width={image.width}
									height={image.height}
									objectFit='contain'
									caption={image.caption}
								/>
							</InputFieldGroup>
							<Controller
								control={control}
								name={image.linkName as keyof PopupFormValues}
								render={({ field }) => (
									<>
										<InputFieldGroup label='연결 링크' isLabelRequired={false} divider={index === 0}>
											<div className={commonWrapper({ width: 'full', direction: 'col', gap: 4, align: 'start' })}>
												<InputField
													placeholder='ex: https://barfdog.co.kr/path/1'
													{...field}
												/>
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