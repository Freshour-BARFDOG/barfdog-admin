'use client';
import { useRouter } from "next/navigation";
import { Controller, useWatch } from "react-hook-form";
import InputField from "@/components/common/inputField/InputField";
import Form from "@/components/common/form/Form";
import Card from "@/components/common/card/Card";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import FormControls from "@/components/common/formControls/FormControls";
import ThumbnailImage from "@/components/pages/community/common/ThumbnailImage";
import MultiFileUploader from "@/components/common/multiFileUploader/MultiFileUploader";
import { useFormHandler } from "@/hooks/useFormHandler";
import { UploadResponse } from "@/types/common";
import { EventFormValues } from "@/types/community";
import { eventSchema } from "@/utils/validation/community/community";
import { STATUS_LIST } from "@/constants/common";
import { useThumbnailUploader } from "@/hooks/useThumbnailUploader";
import { useUploadEventImage } from "@/api/community/mutations/useUploadEventImage";
import { useMultiImageUploader } from "@/hooks/useMultiImageUploader";

interface EventFormProps {
	onSubmit: (data: EventFormValues) => void;
	defaultUpdateFormValue: EventFormValues;
}

export default function EventForm({
	onSubmit,
	defaultUpdateFormValue,
}: EventFormProps) {
	const router = useRouter();
	const { mutateAsync } = useUploadEventImage();

	const {
		control,
		handleSubmit,
		isValid,
		setValue,
		watch,
	} = useFormHandler<EventFormValues>(eventSchema, defaultUpdateFormValue, 'all');

	const thumbnailId = useWatch({ control, name: "thumbnailId" });
	const thumbnailUrl = useWatch({ control, name: "thumbnailUrl" });
	const filename = useWatch({ control, name: "filename" });
	const url = useWatch({ control, name: "url" });

	const eventImageList = defaultUpdateFormValue.imageOrderDtoList ?? [];

	const { handleThumbnailChange } = useThumbnailUploader(
		setValue,
		(file: File) => mutateAsync({ file, type: 'thumbnail' }) as Promise<UploadResponse>
	);

	const { handleFileUpload, handleFileRemove } = useMultiImageUploader<EventFormValues>({
		uploadFn: (file: File) => mutateAsync({ file, type: 'image' }) as Promise<UploadResponse>,
		imageOrderKey: 'imageOrderDtoList',
		addImageIdKey: 'addImageIdList',
		deleteImageIdKey: 'deleteImageIdList',
		setValue,
		watch,
		imageList: eventImageList,
	});


	return (
		<>
		<Card shadow='none' padding={20}>
			<Form>
				<Controller
					control={control}
					name='title'
					render={({ field }) => (
						<InputFieldGroup label='제목'>
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
				<ThumbnailImage
					thumbnailId={thumbnailId}
					thumbnailUrl={url ?? thumbnailUrl}
					filename={filename}
					imageSize={{
						top: {
							width: 'full',
							height: 220,
						},
						bottom: {
							width: 800,
							height: 220,
						}
					}}
					imageCaption={{
						top: '* PC 화면',
						bottom: '* Mobile 화면',
					}}
					captions={[
						'* 이미지 권장사이즈: 1200 x 220',
						'* 이미지 내 텍스트 삽입 안전범위: 800px 이내(1200 x 220 기준, 좌우 여백 각 200)'
					]}
					handleThumbnailChange={handleThumbnailChange}
				/>
				<InputFieldGroup label='상세 설명' align='start' divider={false}>
					<MultiFileUploader
						maxFiles={5}
						onChange={(files) => handleFileUpload(files)}
						onRemove={handleFileRemove}
						width={100}
						height={100}
						initialFiles={eventImageList}
						captions={[
							'* 이미지는 최소 1장, 최대 5장 등록가능합니다.',
							'* 파일크기는 10MB이하 / jpg, jpeg, png, gif 형식만 등록가능합니다.'
						]}
					/>
				</InputFieldGroup>
			</Form>
		</Card>
		<FormControls
			cancelText={defaultUpdateFormValue ? '목록' : '취소'}
			confirmText={defaultUpdateFormValue ? '수정' : '등록'}
			onCancel={() => router.push('/community/event')}
			onConfirm={handleSubmit(onSubmit)}
			isConfirmDisabled={!isValid}
		/>
		</>
	);
}