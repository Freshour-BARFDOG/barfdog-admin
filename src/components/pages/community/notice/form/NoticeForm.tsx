'use client';
import { useRouter } from "next/navigation";
import { Controller, useWatch } from "react-hook-form";
import InputField from "@/components/common/inputField/InputField";
import Form from "@/components/common/form/Form";
import Card from "@/components/common/card/Card";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import TiptapEditor from "@/components/common/tiptapEditor/TiptapEditor";
import FormControls from "@/components/common/formControls/FormControls";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useContentEditor } from "@/hooks/useContentEditor";
import { UploadResponse } from "@/types/common";
import { NoticeFormValues } from "@/types/community";
import { noticeSchema } from "@/utils/validation/community/community";
import { STATUS_LIST } from "@/constants/common";
import { useUploadCommunityImage } from "@/api/community/mutations/useUploadCommunityImage";

interface NoticeFormProps {
	onSubmit: (data: NoticeFormValues) => void;
	defaultUpdateFormValue: NoticeFormValues;
}

export default function NoticeForm({
	onSubmit,
	defaultUpdateFormValue,
}: NoticeFormProps) {
	const router = useRouter();
	const { mutateAsync } = useUploadCommunityImage();

	const {
		control,
		handleSubmit,
		isValid,
		setValue,
		watch,
	} = useFormHandler<NoticeFormValues>(noticeSchema, defaultUpdateFormValue, 'all');
	const contents = useWatch({ control, name: "contents" });

	const { handleContentChange, handleImageUpload } = useContentEditor(
		setValue, 
		watch,
		(file: File) => mutateAsync({ file }) as Promise<UploadResponse>
	);

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
						content={contents}
						onUpdate={handleContentChange}
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