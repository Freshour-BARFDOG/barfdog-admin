import { Controller, Control } from "react-hook-form";
import { commonWrapper, pointColor } from "@/styles/common.css";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import InputField from "@/components/common/inputField/InputField";
import TooltipInfo from "@/components/common/tooltip/TooltipInfo";
import { formatNumberWithComma } from "@/utils/formatNumber";
import { BOOLEAN_OPTIONS } from "@/constants/products";
import { GeneralProductFormValues } from "@/utils/validation/products/generalProduct";
import * as styles from "../GeneralProduct.css";
import { parseAndClampNumber } from "@/utils/parseAndClampNumber";

interface StockSectionProps {
  control: Control<GeneralProductFormValues>;
  inStock: boolean;
}

export default function StockSection({ control, inStock }: StockSectionProps) {
  return (
    <InputFieldGroup
      label={
        <TooltipInfo
          title={
            <>
              재고 여부 <span className={pointColor}>*</span>
            </>
          }
        >
          1. 품절된 상품은 아이템리스트 내에 품절처리 UI로 나타납니다.
          <br />
          2. 품절된 상품은 상세페이지로 접근할 수 없습니다.
        </TooltipInfo>
      }
      isLabelRequired={false}
      divider
    >
      <div
        className={commonWrapper({
          direction: "col",
          gap: 8,
          align: "start",
        })}
      >
        <Controller
          control={control}
          name="inStock"
          render={({ field }) => (
            <LabeledRadioButtonGroup<boolean>
              options={BOOLEAN_OPTIONS}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {inStock && (
          <Controller
            control={control}
            name="remaining"
            render={({ field }) => (
              <div className={styles.inputFieldStyle}>
                <InputField
                  value={formatNumberWithComma(field.value)}
                  onChange={(e) =>
                    field.onChange(
                      parseAndClampNumber({ rawInput: e.target.value })
                    )
                  }
                  unit="개"
                />
              </div>
            )}
          />
        )}
      </div>
    </InputFieldGroup>
  );
}
