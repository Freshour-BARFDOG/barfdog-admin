import * as styles from './GroupTarget.css';
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import GradeSelector from "@/components/pages/benefits/common/selector/GradeSelector";
import BirthYearSelector from "@/components/pages/benefits/common/selector/BirthYearSelector";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import { Control, Controller, FieldValues, Path, PathValue, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { AREA_LIST } from "@/constants/common";

interface GroupTargetProps<TFormValues extends FieldValues> {
	control: Control<TFormValues>;
	setValue: UseFormSetValue<TFormValues>;
	trigger: UseFormTrigger<TFormValues>;
}

export default function GroupTarget<TFormValues extends FieldValues>({
	control,
	setValue,
	trigger,
}: GroupTargetProps<TFormValues>) {
	return (
		<div className={styles.groupTarget}>
			<Controller
				control={control}
				name={'gradeList' as Path<TFormValues>}
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
						setValue('birthYearFrom' as Path<TFormValues>, from as PathValue<TFormValues, Path<TFormValues>>);
						setValue('birthYearTo' as Path<TFormValues>, to as PathValue<TFormValues, Path<TFormValues>>);
						await trigger();
					}}
				/>
			</InputFieldGroup>
			<Controller
				control={control}
				name={'area' as Path<TFormValues>}
				render={({ field }) => (
					<InputFieldGroup label='지역' dividerColor='gray300'>
						<LabeledRadioButtonGroup
							value={field.value ?? ''}
							onChange={field.onChange}
							options={AREA_LIST}
						/>
					</InputFieldGroup>
				)}
			/>
			<Controller
				control={control}
				name={'subscribe' as Path<TFormValues>}
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
				name={'longUnconnected' as Path<TFormValues>}
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