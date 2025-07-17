'use client';
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import InputField from "@/components/common/inputField/InputField";
import Form from "@/components/common/form/Form";
import Card from "@/components/common/card/Card";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import SelectBox from "@/components/common/selectBox/SelectBox";
import TiptapEditor from "@/components/common/tiptapEditor/TiptapEditor";
import FormControls from "@/components/common/formContorls/FormControls";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useContentEditor } from "@/hooks/useContentEditor";
import { ArticleFormValues, UploadResponse } from "@/types/community";
import { articleSchema } from "@/utils/validation/community/community";
import { STATUS_LIST } from "@/constants/common";
import { ARTICLE_CATEGORY_LIST } from "@/constants/community";
import { useUploadCommunityImage } from "@/api/community/mutations/useUploadCommunityImage";
import { useUploadThumbnailImage } from "@/api/community/mutations/useUploadThumbnailImage";
import { useThumbnailUploader } from "@/hooks/useThumbnailUploader";
import ThumbnailImage from "@/components/pages/community/common/ThumbnailImage";

interface ArticleFormProps {
	onSubmit: (data: ArticleFormValues) => void;
	defaultUpdateFormValue: ArticleFormValues;
}

export default function ArticleForm({
	onSubmit,
	defaultUpdateFormValue,
}: ArticleFormProps) {
	const router = useRouter();
	const { mutateAsync } = useUploadCommunityImage();
	const { mutateAsync: uploadThumbnail } = useUploadThumbnailImage();

	const {
		control,
		handleSubmit,
		isValid,
		setValue,
		watch,
	} = useFormHandler<ArticleFormValues>(articleSchema, defaultUpdateFormValue, 'all');

	const { handleContentChange, handleImageUpload } = useContentEditor(
		setValue, 
		watch,
		(file: File) => mutateAsync({ file }) as Promise<UploadResponse>
	);

	const { handleThumbnailChange } = useThumbnailUploader(
		setValue,
		(file: File) => uploadThumbnail({ file }) as Promise<UploadResponse>
	);

	return (
		<>
		<Card shadow='none' padding={20}>
			<Form>
				<Controller
					control={control}
					name='category'
					render={({ field }) => (
						<InputFieldGroup label='카테고리'>
							<SelectBox
								options={ARTICLE_CATEGORY_LIST}
								{...field}
							/>
						</InputFieldGroup>
					)}
				/>
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
					thumbnailUrl={watch('thumbnailUrl')}
					filename={watch('filename')}
					imageSize={{
						top: {
							width: 400,
							height: 400,
						},
						bottom: {
							width: 700,
							height: 400,
						}
					}}
					imageCaption={{
						top: '* 게시글 썸네일',
						bottom: '* 추천 아티클 썸네일',
					}}
					captions={['* [추천 아티클]에 등록할 블로그는 가로 700 x 세로 400 이상의 썸네일 이미지가 권장됩니다.']}
					handleThumbnailChange={handleThumbnailChange}
				/>
				<InputFieldGroup label='내용' align='start' divider={false}>
					<TiptapEditor
						content={watch('contents')}
						onUpdate={handleContentChange}
						onImageUpload={handleImageUpload}
					/>
				</InputFieldGroup>
			</Form>
		</Card>
		<FormControls
			cancelText={defaultUpdateFormValue?.id ? '목록' : '취소'}
			confirmText={defaultUpdateFormValue?.id ? '수정' : '등록'}
			onCancel={() => router.push('/community/article')}
			onConfirm={handleSubmit(onSubmit)}
			isConfirmDisabled={!isValid}
		/>
		</>
	);
}