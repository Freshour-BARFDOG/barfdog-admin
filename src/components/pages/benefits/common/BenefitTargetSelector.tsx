import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import { SelectOption } from "@/types/common";
import { FieldValues, Path, UseFormSetValue } from "react-hook-form";

interface BenefitTargetSelectorProps<
	TFormValues extends FieldValues, 
	TTarget extends string = string
> {
	options: SelectOption<TTarget>[];
	targetValue: TTarget;
	setTargetValue: (value: TTarget) => void;
	setValue: UseFormSetValue<TFormValues>;
}

export default function BenefitTargetSelector<TFormValues extends FieldValues, TTarget extends string>({
	options,
	targetValue,
	setTargetValue,
	setValue,
}: BenefitTargetSelectorProps<TFormValues, TTarget>) {
	
	const resetGroupFields = [
		['gradeList', []],
		['birthYearFrom', ''],
		['birthYearTo', ''],
		['area', 'ALL'],
		['subscribe', false],
		['longUnconnected', false],
	] as Array<[Path<TFormValues>, any]>;
	
	const resetPersonalFields = [
		['memberIdList', []],
	] as Array<[Path<TFormValues>, any]>;

	return (
		<InputFieldGroup label='발행 대상'>
			<LabeledRadioButtonGroup
				options={options}
				value={targetValue}
				onChange={(value) => {
					setTargetValue(value as TTarget);
					setTargetValue(value as TTarget);

					if (value !== 'GROUP') {
						resetGroupFields.forEach(([key, val]) => setValue(key, val));
					}
					if (value !== 'PERSONAL') {
						resetPersonalFields.forEach(([key, val]) => setValue(key, val));
					}
				}}
			/>
		</InputFieldGroup>
	);
}