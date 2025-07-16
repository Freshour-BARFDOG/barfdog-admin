'use client';
import { useRouter } from "next/navigation";
import { useToastStore } from "@/store/useToastStore";
import { Controller } from "react-hook-form";
import InputField from "@/components/common/inputField/InputField";
import Form from "@/components/common/form/Form";
import Card from "@/components/common/card/Card";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import TiptapEditor from "@/components/common/tiptapEditor/TiptapEditor";
import FormControls from "@/components/common/formContorls/FormControls";
import { useFormHandler } from "@/hooks/useFormHandler";
import { NoticeFormValues, UploadResponse } from "@/types/community";
import { noticeSchema } from "@/utils/validation/community/community";
import { parseImageIdsFromContent } from "@/utils/parseImageIdsFromContent";
import { STATUS_LIST } from "@/constants/common";
import { useUploadNoticeImage } from "@/api/community/mutations/useUploadNoticeImage";

interface NoticeFormProps {
	onSubmit: (data: NoticeFormValues) => void;
	defaultUpdateFormValue: NoticeFormValues;
}

export default function NoticeForm({
	onSubmit,
	defaultUpdateFormValue,
}: NoticeFormProps) {
	const router = useRouter();
	const { mutateAsync } = useUploadNoticeImage();

	const {
		control,
		handleSubmit,
		isValid,
		setValue,
		watch,
	} = useFormHandler<NoticeFormValues>(noticeSchema, defaultUpdateFormValue, 'all');

	const { addToast } = useToastStore();

	const onContentChange = (html: string) => {
		if (watch('contents') !== html) {
			setValue('contents', html, { shouldValidate: true  });
		}
		// 이미지 ID 추출
		const currentIds = parseImageIdsFromContent(html);

		// 기존 originId 중 빠진 건 삭제 목록으로 처리
		const deletedIds = watch('addImageIdList')?.filter(id => !currentIds.includes(id));

		setValue('addImageIdList', currentIds);
		setValue('deleteImageIdList', deletedIds);
	};

	const handleImageUpload = async (file: File): Promise<string | undefined> => {
		if (!file) return;

		try {
			const result = await mutateAsync({ file });
			const id = (result as UploadResponse)?.id;
			const url = (result as UploadResponse)?.url;
			if (!id || !url) {
				throw new Error('이미지 업로드 응답이 올바르지 않습니다.');
			}
			setValue('addImageIdList', [...(watch('addImageIdList') ?? []), id]);
			return `${url}#id=${id}#`;

		} catch (error) {
			console.log(error)
			addToast('이미지 업로드 실패');
			return;
		}
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
				<InputFieldGroup label='내용' align='start' divider={false}>
					<TiptapEditor
						content={watch('contents')}
						onUpdate={onContentChange}
						onImageUpload={handleImageUpload}
					/>
				</InputFieldGroup>
			</Form>
		</Card>
		<FormControls
			cancelText={defaultUpdateFormValue?.id ? '목록' : '취소'}
			confirmText={defaultUpdateFormValue?.id ? '수정' : '등록'}
			onCancel={() => router.push('/community/notice')}
			onConfirm={handleSubmit(onSubmit)}
			isConfirmDisabled={!isValid}
		/>
		</>
	);
}