'use client';
import { useRouter } from "next/navigation";
import { Controller, useWatch } from "react-hook-form";
import InputField from "@/components/common/inputField/InputField";
import Form from "@/components/common/form/Form";
import Card from "@/components/common/card/Card";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import FormControls from "@/components/common/formContorls/FormControls";
import ThumbnailImage from "@/components/pages/community/common/ThumbnailImage";
import MultiFileUploader from "@/components/common/multiFileUploader/MultiFileUploader";
import { useFormHandler } from "@/hooks/useFormHandler";
import { EventFormValues, UploadResponse } from "@/types/community";
import { eventSchema } from "@/utils/validation/community/community";
import { STATUS_LIST } from "@/constants/common";
import { useThumbnailUploader } from "@/hooks/useThumbnailUploader";
import { useUploadEventImage } from "@/api/community/mutations/useUploadEventImage";
import { useToastStore } from "@/store/useToastStore";

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

	const eventImageList = defaultUpdateFormValue.imageOrderDtoList ?? [];

	const imageOrderDtoList = useWatch({ control, name: "imageOrderDtoList" });
	const addImageIdList = useWatch({ control, name: "addImageIdList" });
	const deleteImageIdList = useWatch({ control, name: "deleteImageIdList" });

	const { handleThumbnailChange } = useThumbnailUploader(
		setValue,
		(file: File) => mutateAsync({ file, type: 'thumbnail' }) as Promise<UploadResponse>
	);

	const { addToast } = useToastStore();

	// 다중 이미지 업로드 처리 함수
	const handleFileUpload = async (files: File[]) => {
		// 현재 이미지 순서 리스트 복사
		const currentOrderList = [...imageOrderDtoList];

		try {
			// 모든 파일 병렬로 업로드 시도
			const results = await Promise.all(
				files.map(file =>
					mutateAsync(
						{ type: 'image', file },
						{
							onError: (error) => {
								console.error(error);
								addToast('이미지 업로드에 실패했습니다.\n관리자에게 문의해주세요.');
								return null;
							},
						}
					).then((data: unknown) => {
						const { id, url } = data as { id: number; url: string };
						return {
							id,
							url,
							filename: file.name,
						};
					})
				)
			);

			const newUploadedImageList = results.map(result => result.id);
			const newOrderList = results.map((result, index) => ({
				id: result.id,
				url: result.url,
				filename: result.filename,
				leakOrder: currentOrderList.length + 1 + index,
			}));

			// 추가된 ID 업데이트
			setValue('addImageIdList', Array.from(new Set([...addImageIdList, ...newUploadedImageList])));
			// 추가된 이미지 객체 업데이트
			setValue('imageOrderDtoList', [...currentOrderList, ...newOrderList]);

		} catch (error) {
			console.error(error);
			addToast('이미지 업로드에 실패했습니다.\n관리자에게 문의해주세요.');
		}
	};


	const handleFileRemove = (id: number | undefined, filename: string) => {
		let currentId: number | undefined = id;
		if (currentId === undefined) {
			const foundImage = eventImageList.find(image => image.filename === filename);
			if (!foundImage) {
				addToast('이미지를 찾을 수 없습니다.');
				return;
			}
			currentId = foundImage.id;
		}

		const isExistingFile = eventImageList?.some(image => image.id === currentId);

		if (isExistingFile && currentId !== undefined) {
			setValue('deleteImageIdList', [...deleteImageIdList, currentId]);
		}

		// addImageIdList 에서 제거
		setValue('addImageIdList', addImageIdList.filter((imageId: number) => imageId !== currentId));

		// imageOrderDtoList 에서 제거 후 leakOrder 재정렬
		const newOrderList = imageOrderDtoList
			.filter(image => image.id !== currentId)
			.map((image, index) => ({
				...image,
				leakOrder: index + 1,
			}));

		setValue('imageOrderDtoList', newOrderList, { shouldValidate: true });
	};

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
					thumbnailId={watch('thumbnailId')}
					thumbnailUrl={watch('url') ?? watch('thumbnailUrl')}
					filename={watch('filename')}
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