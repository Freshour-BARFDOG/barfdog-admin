'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useWatch } from "react-hook-form";
import { commonWrapper, pointColor } from "@/styles/common.css";
import { useQueryClient } from "@tanstack/react-query";
import Card from "@/components/common/card/Card";
import Form from "@/components/common/form/Form";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import TooltipInfo from "@/components/common/tooltip/TooltipInfo";
import SelectBox from "@/components/common/selectBox/SelectBox";
import DatePicker from "@/components/common/datePicker/DatePicker";
import StarRating from "@/components/common/starRating/StarRating";
import MultiFileUploader from "@/components/common/multiFileUploader/MultiFileUploader";
import FormControls from "@/components/common/formControls/FormControls";
import Textarea from "@/components/common/textarea/Textarea";
import InputField from "@/components/common/inputField/InputField";
import { queryKeys } from "@/constants/queryKeys";
import { useToastStore } from "@/store/useToastStore";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useMultiImageUploader } from "@/hooks/useMultiImageUploader";
import { defaultReviewFormValues, reviewSchema } from "@/utils/validation/review/review";
import { GENERAL_PRODUCT_CATEGORY_OPTIONS } from "@/constants/products";
import { REVIEW_TYPE_LIST } from "@/constants/review";
import { ProductItemType, ReviewFormValues } from "@/types/review";
import { ImageFile, UploadResponse } from "@/types/common";
import { useUploadImage } from "@/api/common/mutations/useUploadImage";
import { useCreateReview } from "@/api/review/mutations/useCreateReview";
import { useGetProductItemList } from "@/api/review/queries/useGetProductItemList";

export default function CreateReview() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { addToast } = useToastStore();

	const [productItemType, setProductItemType] = useState<ProductItemType>('ALL' as ProductItemType);

	const {
		control,
		handleSubmit,
		setValue,
		watch,
		isValid
	} = useFormHandler<ReviewFormValues>(reviewSchema, defaultReviewFormValues, "all");

	const reviewType = useWatch({ control, name: "type" });
	const imageList = useWatch({ control, name: "reviewImageIdList" });

	const { data: itemList } = useGetProductItemList(productItemType);
	const { mutateAsync } = useUploadImage("/api/reviews/upload");
	const { mutate } = useCreateReview();

	const { handleFileUpload, handleFileRemove } = useMultiImageUploader<ReviewFormValues>({
		uploadFn: (file: File) => mutateAsync({ file }) as Promise<UploadResponse>,
		imageOrderKey: 'reviewImageIdList',
		setValue,
		watch,
		imageList: imageList as ImageFile[],
	});
	
	const onSubmit = (data: ReviewFormValues) => {
		const { reviewImageIdList, ...rest } = data;
		const body = {
			...rest,
			reviewImageIdList: reviewImageIdList
				.map(review => typeof review === 'number' ? review : review.id)
				.filter((id): id is number => typeof id === 'number')
		}

		mutate({
			body
		},{
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_REVIEW_LIST, 0],
				});
				addToast('리뷰 등록이 완료되었습니다!');
				router.push('/review');
			},
			onError: (error) => {
				console.log(error)
				addToast('리뷰 등록에 실패했습니다.\n관리자에게 문의해주세요.');
			}
		})
	}

	return (
		<div className={commonWrapper({ direction: 'col', gap: 20 })}>
			<Card shadow="none" padding={20}>
				<Form>
					<Controller
						control={control}
						name='type'
						render={({ field }) => (
							<InputFieldGroup
								label={
									<TooltipInfo
										title={(
											<>상품 카테고리<span className={pointColor}>*</span></>
										)}
									>
										카테고리 선택 후 생성이 시작됩니다.
									</TooltipInfo>
								}
								isLabelRequired={false}
							>
								<div className={commonWrapper({ gap: 8, align: 'center', justify: 'start' })}>
									<SelectBox
										options={REVIEW_TYPE_LIST}
										value={field.value as string}
										onChange={(value) => {
											field.onChange(value);
											const newProductItemType = value === 'SUBSCRIBE' ? 'recipes' as ProductItemType : 'ALL' as ProductItemType;
											setProductItemType(newProductItemType);
										}}
									/>
									{reviewType === 'ITEM' &&
										<SelectBox
											options={GENERAL_PRODUCT_CATEGORY_OPTIONS}
											value={productItemType}
											onChange={(value) => setProductItemType(value as ProductItemType)}
										/>
									}
								</div>
							</InputFieldGroup>
						)}
					/>
					{reviewType &&
						<>
							<Controller
								control={control}
								name='id'
								render={({ field }) => (
									<InputFieldGroup
										label={
											<TooltipInfo
												title={(
													<>상품명<span className={pointColor}>*</span></>
												)}
											>
												SHOP 페이지 리뷰에서 후기 작성 버튼을 통해 접속한 경우 변경할 수 없습니다.
											</TooltipInfo>
										}
										isLabelRequired={false}
									>
										<SelectBox
											options={itemList ?? []}
											value={field.value}
											onChange={field.onChange}
										/>
									</InputFieldGroup>
								)}
							/>
	          <Controller
	              control={control}
	              name='writtenDate'
	              render={({ field }) => (
									<InputFieldGroup label='작성일자'>
										<DatePicker
											value={field.value}
											onChange={field.onChange}
										/>
									</InputFieldGroup>
								)}
	            />
	            <Controller
	              control={control}
	              name='username'
	              render={({ field }) => (
									<InputFieldGroup label='사용자 이름'>
										<InputField
											value={field.value}
											onChange={field.onChange}
											placeholder='리뷰에 표기될 사용자 이름을 입력하세요.'
										/>
									</InputFieldGroup>
								)}
	            />
	            <Controller
	              control={control}
	              name='star'
	              render={({ field }) => (
									<InputFieldGroup label='리뷰 별점'>
										<StarRating
											value={field.value}
											onChange={field.onChange}
										/>
									</InputFieldGroup>
								)}
	            />
	            <Controller
	              control={control}
	              name='contents'
	              render={({ field }) => (
									<InputFieldGroup label='상세 리뷰'>
										<Textarea
											value={field.value}
											onChange={field.onChange}
											maxLength={1000}
											rows={10}
										/>
									</InputFieldGroup>
								)}
	            />
	            <InputFieldGroup label='상세 리뷰'>
	              <MultiFileUploader
	                maxFiles={10}
	                onChange={(files) => handleFileUpload(files)}
	                onRemove={handleFileRemove}
	                width={100}
	                height={100}
	                initialFiles={[]}
	                captions={[
				            '* 첫 번째 이미지가 대표 이미지로 노출됩니다.',
				            '* 이미지는 최대 10장 이내로 등록 가능합니다.',
				            '* 파일크기는 10MB이하 / jpg, jpeg, png, gif 형식만 등록가능합니다.'
			            ]}
	              />
	            </InputFieldGroup>
	          </>
					}
				</Form>
			</Card>
			<FormControls
				cancelText='취소'
				confirmText='등록'
				onCancel={() => router.push('/review')}
				onConfirm={handleSubmit(onSubmit)}
				isConfirmDisabled={!isValid}
			/>
		</div>
	);
}