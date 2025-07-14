'use client';
import * as styles from '../../../Benefits.css';
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import Card from "@/components/common/card/Card";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import DatePicker from "@/components/common/datePicker/DatePicker";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import SelectBox from "@/components/common/selectBox/SelectBox";
import GroupTarget from "@/components/pages/benefits/common/groupTarget/GroupTarget";
import PersonalTarget from "@/components/pages/benefits/common/personalTarget/PersonalTarget";
import Button from "@/components/common/button/Button";
import { useFormHandler } from "@/hooks/useFormHandler";
import { ReleaseCouponFormValues, ReleaseCouponTarget } from "@/types/benefits/coupons";
import { RELEASE_COUPON_TARGET_LIST, RELEASE_COUPON_TYPE_LIST} from "@/constants/benefits/coupons";
import { useGetPublicationCouponList } from "@/api/coupons/queries/useGetPublicationCouponList";
import { useReleaseCoupon } from "@/api/coupons/mutations/useReleaseCoupon";
import { useToastStore } from "@/store/useToastStore";
import { defaultValues, getCouponSchemaByTarget } from "@/utils/validation/benefits/coupon/releaseCoupon";
import BenefitTargetSelector from "@/components/pages/benefits/common/BenefitTargetSelector";

export default function ReleaseCouponForm() {
	const router = useRouter();

	const [couponTarget, setCouponTarget] = useState<ReleaseCouponTarget>('ALL');
	const schema = useMemo(() => getCouponSchemaByTarget(couponTarget), [couponTarget]);
	const {
		control,
		handleSubmit,
		setValue,
		getValues,
		isValid,
		trigger,
		reset
	} = useFormHandler<ReleaseCouponFormValues>(schema, defaultValues, 'all');

	const { data: publicationCouponList } = useGetPublicationCouponList(getValues('couponType'));
	const { mutate } = useReleaseCoupon();
	const { addToast } = useToastStore();

	useEffect(() => {
		trigger(); // schema가 바뀌었을 때 강제 유효성 검사
	}, [schema]);

	const onSubmit = (data: ReleaseCouponFormValues) => {
		const common = {
			couponType: data.couponType,
			couponId: data.couponId,
			expiredDate: data.expiredDate,
			alimTalk: data.alimTalk,
		};

		let targetData = {};
		switch (couponTarget) {
			case 'PERSONAL':
				targetData = { memberIdList: data.memberIdList };
				break;

			case 'GROUP':
				targetData = {
					subscribe: data.subscribe,
					longUnconnected: data.longUnconnected,
					gradeList: data.gradeList,
					area: data.area,
					birthYearFrom: data.birthYearFrom,
					birthYearTo: data.birthYearTo,
				};
				break;

			case 'ALL':
			default:
				break;
		}

		const requestBody = {
			...common,
			...targetData,
		};

		mutate({
			couponTarget: couponTarget,
			body: requestBody,
		}, {
			onSuccess: () => {
				reset(defaultValues);
				setCouponTarget('ALL');
				addToast('쿠폰 발행이 완료되었습니다!');
			},
			onError: (error) => {
				console.log(error);
				addToast('쿠폰 발행에 실패했습니다.\n관리자에게의 문의해주세요.')
			}
		})
	};

	return (
		<>
			<Card shadow='none' padding={20}>
				<form className={styles.benefitForm({})}>
					<InputFieldGroup label='발행 대상'>
						<BenefitTargetSelector<ReleaseCouponFormValues, ReleaseCouponTarget>
							targetValue={couponTarget}
							setTargetValue={setCouponTarget}
							options={RELEASE_COUPON_TARGET_LIST}
							setValue={setValue}
						/>
					</InputFieldGroup>
					{couponTarget === 'GROUP' &&
						<GroupTarget<ReleaseCouponFormValues> control={control} setValue={setValue} trigger={trigger} />
					}
					{couponTarget === 'PERSONAL' &&
						<PersonalTarget<ReleaseCouponFormValues> setValue={setValue} trigger={trigger} />
					}
					<Controller
						control={control}
						name='expiredDate'
						render={({ field }) => (
							<InputFieldGroup label='유효기간'>
								<DatePicker
									{...field}
								/>
							</InputFieldGroup>
						)}
					/>
					<Controller
						control={control}
						name='couponType'
						render={({ field }) => (
							<InputFieldGroup label='쿠폰 타입'>
								<LabeledRadioButtonGroup
									options={RELEASE_COUPON_TYPE_LIST}
									onChange={(value) => {
										setValue('couponId', null);
										field.onChange(value);
									}}
									value={field.value}
								/>
							</InputFieldGroup>
						)}
					/>
					<Controller
						control={control}
						name='couponId'
						render={({ field }) => (
							<InputFieldGroup label='쿠폰 선택'>
								<SelectBox
									options={
										publicationCouponList?.map(coupon => ({
											label: `[할인: ${coupon.discount}] ${coupon.name}`,
											value: coupon.couponId,
										})) ?? []
									}
									{...field}
								/>
							</InputFieldGroup>
						)}
					/>
					<Controller
						control={control}
						name='alimTalk'
						render={({ field }) => (
							<InputFieldGroup label='알림톡 발송' divider={false}>
								<LabeledRadioButtonGroup
									options={[
										{ label: 'Y', value: true },
										{ label: 'N', value: false },
									]}
									{...field}
								/>
							</InputFieldGroup>
						)}
					/>
				</form>
			</Card>
			<div className={styles.benefitControls}>
				<Button onClick={() => router.back()} variant='outline' type='assistive'>취소</Button>
				<Button onClick={handleSubmit(onSubmit)} disabled={!isValid} >쿠폰 발행</Button>
			</div>
		</>
	);
}