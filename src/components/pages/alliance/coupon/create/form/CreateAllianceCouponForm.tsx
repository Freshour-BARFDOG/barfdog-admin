"use client";
import { commonWrapper, pointColor } from "@/styles/common.css";
import { ChangeEvent, ReactNode } from "react";
import { format } from "date-fns";
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
  useWatch
} from "react-hook-form";
import Card from "@/components/common/card/Card";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import Text from "@/components/common/text/Text";
import Form from "@/components/common/form/Form";
import DiscountControl from "@/components/common/discountControl/DiscountControl";
import DateTimePicker from "@/components/common/dateTimePicker/DateTimePicker";
import SelectBox from "@/components/common/selectBox/SelectBox";
import LabeledInput from "@/components/common/labeledInput/LabeledInput";
import InputField from "@/components/common/inputField/InputField";
import TooltipInfo from "@/components/common/tooltip/TooltipInfo";
import { unformatCommaNumber, formatNumberWithComma } from "@/utils/formatNumber";
import { DISCOUNT_UNIT_TYPE_LIST } from "@/constants/common";
import { ALLIANCE_COUPON_TARGET_LIST } from "@/constants/alliance";
import { AllianceCouponFormValues, AllianceCouponSelectOption } from "@/types/alliance";
import { SelectOption } from "@/types/common";

type AllianceCouponFieldName = keyof AllianceCouponFormValues;

interface InputFieldItem<TFormValues extends FieldValues> {
  name: AllianceCouponFieldName;
  label: string | ReactNode;
  isRequired?: boolean;
  render: (
    field: ControllerRenderProps<TFormValues, Path<TFormValues>>
  ) => ReactNode;
}

const couponLengthOptions = Array.from({ length: 16 - 8 + 1 }, (_, i) => ({
  label: String(i + 8),
  value: i + 8
})) as SelectOption<number>[];

interface CreateAllianceCouponFormProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  setValue: UseFormSetValue<TFormValues>;
  allianceList: AllianceCouponSelectOption[];
}

export default function CreateAllianceCouponForm<TFormValues extends FieldValues>({
  control,
  setValue,
  allianceList,
}: CreateAllianceCouponFormProps<TFormValues>) {
  const discountType = useWatch({ control, name: "discountType" as Path<TFormValues> });
  const useStartDate = useWatch({ control, name: "useStartDate" as Path<TFormValues> });
  const useExpiredDate = useWatch({ control, name: "useExpiredDate" as Path<TFormValues> });
  const allianceId = useWatch({ control, name: "allianceId" as Path<TFormValues> });

  const allianceEventList = allianceId &&
    allianceList.find(alliance => Number(alliance.value) === Number(allianceId))?.eventInfoList
    || [];

  const handleChangeNumberType = (
    e: ChangeEvent<HTMLInputElement>,
    field: { onChange: (value: number) => void }
  ) => {
    const raw = unformatCommaNumber(e.target.value);
    field.onChange(raw);
  };

  const InputFieldList: InputFieldItem<TFormValues>[] = [
    {
      name: "allianceId",
      label: "제휴사",
      render: (field) => (
        <SelectBox
          value={field.value ?? undefined}
          options={[{label: '선택', value: 0}, ...allianceList.filter(alliance => alliance.eventInfoList.length > 0)]}
          onChange={(value) => setValue('allianceId' as Path<TFormValues> , value as PathValue<TFormValues, Path<TFormValues>>, { shouldValidate: true })}
          disabled={allianceList.length === 0}
        />
      ),
    },
    {
      name: "allianceEventId",
      label: "행사",
      render: (field) => (
        <div className={commonWrapper({ direction: 'col', gap: 4, align: 'start' })}>
          <SelectBox
            value={field.value ?? undefined}
            options={[{label: '선택', value: 0}, ...allianceEventList]}
            onChange={(value) => setValue('allianceEventId' as Path<TFormValues> , value as PathValue<TFormValues, Path<TFormValues>>, { shouldValidate: true })}
            disabled={allianceEventList.length === 0}
          />
          <Text type="caption" color='red' block>* 제휴사의 행사가 등록되어야 쿠폰 발급이 가능합니다.</Text>
        </div>
      ),
    },
    {
      name: "name",
      label: "쿠폰 이름",
      render: (field) => (
        <InputField value={field.value} onChange={field.onChange} />
      ),
    },
    {
      name: "description",
      label: "쿠폰 설명",
      render: (field) => (
        <InputField value={field.value} onChange={field.onChange} />
      ),
    },
    {
      name: "couponTarget",
      label: "사용처",
      render: (field) => (
        <LabeledRadioButtonGroup
          value={field.value ?? ""}
          onChange={field.onChange}
          options={ALLIANCE_COUPON_TARGET_LIST}
        />
      ),
    },
    {
      name: "discountDegree",
      label: "할인율",
      render: (field) => (
        <DiscountControl
          value={field.value as number}
          onValueChange={field.onChange}
          options={DISCOUNT_UNIT_TYPE_LIST}
          selected={discountType}
          onToggleChange={(value) => {
            setValue('discountType' as Path<TFormValues>, value as PathValue<TFormValues, Path<TFormValues>>, { shouldValidate: true });
          }}
          discountType={discountType}
        />
      ),
    },
    {
      name: "availableMaxDiscount",
      label: "최대 할인 금액",
      render: (field) => (
        <LabeledInput label='원 할인'>
          <InputField
            width={170}
            value={formatNumberWithComma(field.value)}
            onChange={(e) => handleChangeNumberType(e, field)}
          />
        </LabeledInput>
      ),
    },
    {
      name: "availableMinPrice",
      label: "최소 사용 금액",
      render: (field) => (
        <LabeledInput label='원 이상'>
          <InputField
            width={170}
            value={formatNumberWithComma(field.value)}
            onChange={(e) => handleChangeNumberType(e, field)}
          />
        </LabeledInput>
      ),
    },
    {
      name: "createCouponCount",
      label: (
        <TooltipInfo
          title={(
            <>쿠폰 개수 <span className={pointColor}>*</span></>
          )}
        >
          입력한 개수만큼 난수쿠폰이 생성됩니다.
        </TooltipInfo>
      ),
      isRequired: false,
      render: (field) => (
        <LabeledInput label='개'>
          <InputField
            width={170}
            value={formatNumberWithComma(field.value)}
            onChange={(e) => handleChangeNumberType(e, field)}
          />
        </LabeledInput>
      ),
    },
    {
      name: "codeLength",
      label: (
        <TooltipInfo
          title={(
            <>쿠폰 코드 자릿수 <span className={pointColor}>*</span></>
          )}
        >
          선택한 자릿수만큼 쿠폰 코드가 생성됩니다.
        </TooltipInfo>
      ),
      isRequired: false,
      render: (field) => (
        <LabeledInput label='자리'>
          <SelectBox
            value={field.value ?? undefined}
            options={couponLengthOptions}
            onChange={(value) => setValue('codeLength' as Path<TFormValues>, value as PathValue<TFormValues, Path<TFormValues>>, { shouldValidate: true })}
          />
        </LabeledInput>
      ),
    },
  ];

  return (
    <Card shadow="none" padding={20}>
      <Form>
        {InputFieldList.map((input) => (
          <Controller
            control={control}
            key={input.name}
            name={input.name as Path<TFormValues>}
            render={({ field }) => (
              <InputFieldGroup label={input.label} isLabelRequired={input.isRequired === undefined}>
                {input.render(field)}
              </InputFieldGroup>
            )}
          />
        ))}
        <InputFieldGroup label='쿠폰 사용 기간' divider={false}>
          <DateTimePicker
            value={useStartDate}
            onChange={(value) =>
              setValue('useStartDate' as Path<TFormValues>, format(value as Date, 'yyyy-MM-dd HH:mm:ss') as PathValue<TFormValues, Path<TFormValues>>, { shouldValidate: true })
            }
          />&nbsp;~&nbsp;
          <DateTimePicker
            value={useExpiredDate}
            onChange={(value) =>
              setValue('useExpiredDate' as Path<TFormValues>, format(value as Date, 'yyyy-MM-dd HH:mm:ss') as PathValue<TFormValues, Path<TFormValues>>, { shouldValidate: true })
            }
          />
        </InputFieldGroup>
      </Form>
    </Card>
  );
}
