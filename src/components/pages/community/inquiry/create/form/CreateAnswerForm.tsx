import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Controller } from "react-hook-form";
import Form from "@/components/common/form/Form";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import Button from "@/components/common/button/Button";
import Card from "@/components/common/card/Card";
import MultiFileUploader from "@/components/common/multiFileUploader/MultiFileUploader";
import InputField from "@/components/common/inputField/InputField";
import Textarea from "@/components/common/textarea/Textarea";
import { queryKeys } from "@/constants/queryKeys";
import { useToastStore } from "@/store/useToastStore";
import { createAnswerSchema } from "@/utils/validation/community/community";
import { UploadResponse } from "@/types/common";
import { CreateAnswerBody, CreateAnswerFormValues } from "@/types/community";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useMultiImageUploader } from "@/hooks/useMultiImageUploader";
import { useUploadCreateAnswerImage } from "@/api/community/mutations/useUploadCreateAnswerImage";
import { useCreateCommunity } from "@/api/community/mutations/useCreateCommunity";
import FormControls from "@/components/common/formControls/FormControls";

interface CreateAnswerFormProps {
	targetId: number;
	handleShowQuestion: () => void;
}

export default function CreateAnswerForm({
	targetId,
	handleShowQuestion,
}: CreateAnswerFormProps) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { addToast } = useToastStore();

	const { mutateAsync } = useUploadCreateAnswerImage();
	const { mutate } = useCreateCommunity<CreateAnswerBody>('questions');

	const defaultFormValue = {
		contents: '',
		questionImgIdList: [],
		targetId: targetId,
		title: '',
	}

	const {
		control,
		handleSubmit,
		isValid,
		setValue,
		watch,
	} = useFormHandler<CreateAnswerFormValues>(createAnswerSchema, defaultFormValue, 'all');

	const { handleFileUpload, handleFileRemove } = useMultiImageUploader<CreateAnswerFormValues>({
		uploadFn: (file: File) => mutateAsync({ file }) as Promise<UploadResponse>,
		imageOrderKey: 'questionImgIdList',
		setValue,
		watch,
		imageList: [],
	});

	const onSubmit = (data: CreateAnswerFormValues) => {
		const body = {
			...data,
			questionImgIdList: data.questionImgIdList.map((image) => image.id),
		}

		mutate({
			body: body as CreateAnswerBody,
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [
						queryKeys.COMMUNITY.BASE,
						queryKeys.COMMUNITY.GET_INQUIRY_DETAIL,
						targetId
					],
				});
				addToast('등록이 완료되었습니다!');
				router.push(`/community/inquiry/${targetId}`);
			},
			onError: (error) => {
				console.log(error)
				addToast('등록에 실패했습니다\n관리자에게 문의해주세요.');
			}
		})
	}
	return (
		<>
			<Card shadow='none' padding={20}>
				<Form gap={12}>
					<InputFieldGroup label='원글 확인' isLabelRequired={false}>
						<Button onClick={handleShowQuestion} size='sm' variant='outline'>
							원글 보기
						</Button>
					</InputFieldGroup>
					<Controller
						control={control}
						name='title'
						render={({ field }) => (
							<InputFieldGroup label='제목'>
								<InputField
									placeholder='제목을 입력해주세요.'
									{...field}
								/>
							</InputFieldGroup>
						)}
					/>
					<Controller
						control={control}
						name='contents'
						render={({ field }) => (
							<InputFieldGroup label='내용'>
								<Textarea
									minLength={10}
									maxLength={1000}
									placeholder='답글을 10자 이상 입력해주세요.'
									{...field}
								/>
							</InputFieldGroup>
						)}
					/>
					<InputFieldGroup label='파일 첨부' align='start' isLabelRequired={false} divider={false}>
						<MultiFileUploader
							maxFiles={5}
							onChange={(files) => handleFileUpload(files)}
							onRemove={handleFileRemove}
							width={100}
							height={100}
							initialFiles={[]}
							captions={[
								'* 이미지는 최대 5장 등록가능합니다.',
								'* 파일크기는 10MB이하 / jpg, jpeg, png, gif 형식만 등록가능합니다.'
							]}
						/>
					</InputFieldGroup>
				</Form>
			</Card>
			<FormControls
				cancelText='취소'
				confirmText='답글 등록'
				onCancel={() => router.back()}
				onConfirm={handleSubmit(onSubmit)}
				isConfirmDisabled={!isValid}
			/>
		</>
	);
}