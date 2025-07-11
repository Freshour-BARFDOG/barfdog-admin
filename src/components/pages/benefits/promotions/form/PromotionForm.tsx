'use client';
import * as styles from "@/components/pages/benefits/Benefits.css";
import { pointColor } from "@/styles/common.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import Card from "@/components/common/card/Card";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import Text from "@/components/common/text/Text";
import Button from "@/components/common/button/Button";
import LabeledRadioButton from "@/components/common/labeledRadioButton/LabeledRadioButton";
import DateTimePicker from "@/components/common/dateTimePicker/DateTimePicker";
import SelectBox from "@/components/common/selectBox/SelectBox";
import InputField from "@/components/common/inputField/InputField";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import useModal from "@/hooks/useModal";
import { useFormHandler } from "@/hooks/useFormHandler";
import { formatNumberWithComma, unformatCommaNumber } from "@/utils/formatNumber";
import { useGetPromotionCouponList } from "@/api/promotions/queries/useGetPromotionCouponList";
import { PromotionCouponDetail, PromotionFormValues } from "@/types/benefits/promotions";
import { PROMOTION_STATUS_LIST } from "@/constants/benefits/promotions";
import { defaultValues, promotionSchema } from "@/utils/validation/benefits/promotion/promotion";

interface PromotionFormProps {
	onSubmit: (data: PromotionFormValues) => void;
	onClose: () => void;
	defaultUpdateFormValue?: PromotionFormValues | null;
	couponDetail?: PromotionCouponDetail | null;
	backgroundColor?: 'gray50' | 'gray0';
}

export default function PromotionForm({
	onSubmit,
	onClose,
	defaultUpdateFormValue = null,
	couponDetail = null,
	backgroundColor = 'gray0',
}: PromotionFormProps) {
	const router = useRouter();
	const { isOpen: isOpenConfirmModal, onClose: onCloseConfirmModal, onToggle: onToggleConfirmModal } = useModal();
	const { data: couponList, isLoading } = useGetPromotionCouponList();

	const {
		control,
		handleSubmit,
		setValue,
		isValid,
		reset,
	} = useFormHandler<PromotionFormValues>(promotionSchema, defaultUpdateFormValue ?? defaultValues, 'all');

	useEffect(() => {
		if (!isLoading && !defaultUpdateFormValue && couponList?.length === 0) {
			onToggleConfirmModal();
		}
	}, [isLoading, defaultUpdateFormValue, couponList, onToggleConfirmModal]);

	return (
		<>
			<Card shadow='none' padding={20} backgroundColor={backgroundColor}>
				<form className={styles.benefitForm({ gap: 12 })}>
					<Controller
						control={control}
						name='promotionType'
						render={({ field }) => (
							<InputFieldGroup label='프로모션 타입'>
								<LabeledRadioButton
									label='쿠폰'
									value={field.value}
									isChecked={!!field.value}
									onToggle={() => setValue('promotionType', field.value)}
								/>
							</InputFieldGroup>
						)}
					/>
					<Controller
						control={control}
						name='name'
						render={({ field }) => (
							<InputFieldGroup label='프로모션 이름'>
								<InputField
									{...field}
								/>
							</InputFieldGroup>
						)}
					/>
					<Controller
						control={control}
						name='startDate'
						render={({ field }) => (
							<InputFieldGroup label='시작 일시'>
								<DateTimePicker value={new Date(field.value)} onChange={field.onChange} />
							</InputFieldGroup>
						)}
					/>
					<Controller
						control={control}
						name='expiredDate'
						render={({ field }) => (
							<InputFieldGroup label='종료 일시'>
								<DateTimePicker value={new Date(field.value)} onChange={field.onChange} />
							</InputFieldGroup>
						)}
					/>
					<Controller
						control={control}
						name='couponId'
						render={({ field }) => (
							<InputFieldGroup label={defaultUpdateFormValue ? '적용된 쿠폰' : '쿠폰 선택'}>
								<SelectBox
									value={field.value ?? undefined}
									options={
										couponDetail
											? [{ label: couponDetail.couponFullName, value: field.value ?? 0 }]
											: couponList ?? []
									}
									onChange={(value) => setValue('couponId', value as number)}
									disabled={!!couponDetail}
									fullWidth
								/>
							</InputFieldGroup>
						)}
					/>
					<Controller
						control={control}
						name='quantity'
						render={({ field }) => (
							<InputFieldGroup label='수량'>
								<div className={styles.benefitInputBox}>
									<div className={styles.benefitInput({ width: 'auto' })}>
										<InputField
											value={formatNumberWithComma(field.value)}
											onChange={(e) => {
												const raw = unformatCommaNumber(e.target.value);
												field.onChange(raw);
											}}
											name={field.name}
										/>
									</div>
									<Text type='body3'>개</Text>
									{couponDetail?.quantity && couponDetail?.remaining &&
										<>
											<Text type='caption2'>발행됨 <span className={pointColor}>{couponDetail.quantity - couponDetail.remaining}</span>개</Text>
											<Text type='caption2'>잔여수량 <span className={pointColor}>{couponDetail.remaining}</span>개</Text>
										</>
									}
								</div>
							</InputFieldGroup>
						)}
					/>
					<Controller
						control={control}
						name='status'
						render={({ field }) => (
							<InputFieldGroup label='상태' divider={false}>
								<LabeledRadioButtonGroup
									options={PROMOTION_STATUS_LIST}
									{...field}
								/>
							</InputFieldGroup>
						)}
					/>
				</form>
			</Card>
			<div className={styles.benefitControls}>
				<Button onClick={onClose} variant='outline' type='assistive'>{defaultUpdateFormValue ? '취소' : '목록'}</Button>
				<Button
					onClick={() => {
						handleSubmit(onSubmit)();
						if (!defaultUpdateFormValue) {
							reset();
						}
					}}
					disabled={!isValid}
				>
					{defaultUpdateFormValue ? '수정' : '생성'}
				</Button>
			</div>
			{isOpenConfirmModal &&
				<AlertModal
					content={`프로모션을 생성하기 위한 쿠폰이 없습니다.\n쿠폰 생성 페이지에서 프로모션 쿠폰을 생성해주세요.`}
					isOpen={isOpenConfirmModal}
					onClose={onCloseConfirmModal}
					onConfirm={() => router.replace('/coupons/create')}
					confirmText='확인'
				/>
			}
		</>
	);
}