import * as styles from './GroupTarget.css';
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import GradeSelector from "@/components/pages/coupons/form/couponReleaseForm/selector/GradeSelector";
import BirthYearSelector from "@/components/pages/coupons/form/couponReleaseForm/selector/BirthYearSelector";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import { Control, Controller, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { RELEASE_COUPON_AREA_LIST } from "@/constants/coupons";
import { ReleaseCouponFormValues } from "@/types/coupons";

interface GroupTargetProps {
	control: Control<ReleaseCouponFormValues>;
	setValue: UseFormSetValue<ReleaseCouponFormValues>;
	trigger: UseFormTrigger<ReleaseCouponFormValues>;
}

export default function GroupTarget({
	control,
	setValue,
	trigger,
}: GroupTargetProps) {
	return (
		<div className={styles.groupTarget}>
			<Controller
				control={control}
				name='gradeList'
				render={({ field }) => (
					<InputFieldGroup label='회원 등급' dividerColor='gray300'>
						<GradeSelector
							onChange={async (range) => {
								field.onChange(range)
								await trigger();
							}}
						/>
					</InputFieldGroup>
				)}
			/>
			<InputFieldGroup label='연령' dividerColor='gray300'>
				<BirthYearSelector
					onChange={async ({ from, to }) => {
						setValue('birthYearFrom', from);
						setValue('birthYearTo', to);
						await trigger();
					}}
				/>
			</InputFieldGroup>
			<Controller
				control={control}
				name='area'
				render={({ field }) => (
					<InputFieldGroup label='지역' dividerColor='gray300'>
						<LabeledRadioButtonGroup
							value={field.value ?? ''}
							onChange={field.onChange}
							options={RELEASE_COUPON_AREA_LIST}
						/>
					</InputFieldGroup>
				)}
			/>
			<Controller
				control={control}
				name='subscribe'
				render={({ field }) => (
					<InputFieldGroup label='구독 유무' dividerColor='gray300'>
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
			<Controller
				control={control}
				name='longUnconnected'
				render={({ field }) => (
					<InputFieldGroup label='장기 미접속' divider={false}>
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
		</div>
	);
}