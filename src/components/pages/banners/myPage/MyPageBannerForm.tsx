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
import { STATUS_LIST } from "@/constants/common";
import { bannerSchema, defaultMyPageBannerFormValues } from "@/utils/validation/banners/banners";
import { MyPageBannerFormValues } from "@/types/banners";

interface MyPageBannerFormProps {
	defaultUpdateFormValue?: MyPageBannerFormValues | null;
	onSubmit: (data: MyPageBannerFormValues) => void;
	setPcFile: (file: File | null) => void;
	setMobileFile: (file: File | null) => void;
}

export default function MyPageBannerForm({
	onSubmit,
	defaultUpdateFormValue = null,
	setPcFile,
	setMobileFile,
}: MyPageBannerFormProps) {
	const router = useRouter();

	const {
		control,
		handleSubmit,
		isValid,
	} = useFormHandler<MyPageBannerFormValues>(bannerSchema, defaultUpdateFormValue ?? defaultMyPageBannerFormValues, 'all');

	const imageList = [
		{
			title: 'PC',
			label: 'PC 이미지',
			linkName: 'pcLinkUrl',
			defaultImageUrl: defaultUpdateFormValue?.thumbnail_pc ?? '',
			imageName: defaultUpdateFormValue?.filenamePc ?? '',
			caption: 'PC 이미지 권장사이즈: 1200 x 60',
			width: 1200,
			height: 60,
			onFileChange: setPcFile,
		},
		{
			title: 'Mobile',
			label: 'Mobile 이미지',
			linkName: 'mobileLinkUrl',
			defaultImageUrl: defaultUpdateFormValue?.thumbnail_mobile ?? '',
			imageName: defaultUpdateFormValue?.filenameMobile ?? '',
			caption: 'PC 이미지 권장사이즈: 600 x 50',
			width: 600,
			height: 50,
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
				confirmText='수정'
				cancelText='취소'
				onConfirm={handleSubmit(onSubmit)}
				onCancel={() => router.back()}
				isConfirmDisabled={!isValid}
			/>
		</>
	);
}