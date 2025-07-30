import { useFieldArray, Control } from "react-hook-form";
import { commonWrapper } from "@/styles/common.css";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import SelectBox from "@/components/common/selectBox/SelectBox";
import AllianceDiscountField from "../../common/discountField/AllianceDiscountField";
import { GeneralProductFormValues } from "@/utils/validation/products/generalProduct";

interface AllianceSectionProps {
  control: Control<GeneralProductFormValues>;
  originalPrice: number;
  allianceOptions: { value: number; label: string }[];
}

export default function AllianceSection({
  control,
  originalPrice,
  allianceOptions,
}: AllianceSectionProps) {
  const {
    fields: allianceFields,
    append: appendAlliance,
    remove: removeAlliance,
  } = useFieldArray({
    name: "allianceDtoList",
    control,
  });

  const handleAddAlliance = (allianceId: number) => {
    if (allianceFields.some((f) => f.allianceId === allianceId)) return;
    appendAlliance({
      allianceId,
      allianceDegree: 0,
      allianceDiscountType: "FLAT_RATE",
      allianceSalePrice: originalPrice,
    });
  };

  return (
    <InputFieldGroup label="제휴사 추가" divider isLabelRequired={false}>
      <div
        className={commonWrapper({
          direction: "col",
          gap: 12,
          align: "start",
        })}
      >
        <SelectBox<number>
          options={allianceOptions}
          placeholder="제휴사 선택"
          onChange={handleAddAlliance}
        />
        {allianceFields.map((field, idx) => {
          const allianceName =
            allianceOptions.find((o) => o.value === field.allianceId)?.label ?? "";
          return (
            <AllianceDiscountField
              key={field.id}
              namePrefix={`allianceDtoList.${idx}`}
              control={control}
              originalPrice={originalPrice}
              allianceName={allianceName}
              onRemove={() => removeAlliance(idx)}
            />
          );
        })}
      </div>
    </InputFieldGroup>
  );
}