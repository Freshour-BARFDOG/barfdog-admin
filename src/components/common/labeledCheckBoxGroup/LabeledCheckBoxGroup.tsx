import { commonWrapper } from "@/styles/common.css";
import { SelectOption } from "@/types/common";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";

interface LabeledCheckboxGroupProps<T extends string | number = string> {
  options: SelectOption<T>[];
  selectedValues: T[];
  onChange: (selected: T[]) => void;
  iconType?: "square" | "circle";
  className?: string;
}

export default function LabeledCheckboxGroup<
  T extends string | number = string
>({
  options,
  selectedValues,
  onChange,
  iconType = "square",
  className = "",
}: LabeledCheckboxGroupProps<T>) {
  const handleToggle = (value: T) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div
      className={`${className} ${commonWrapper({
        direction: "row",
        align: "center",
        justify: "start",
        gap: 8,
        wrap: "wrap",
      })}`}
    >
      {options.map((option) => (
        <LabeledCheckbox
          key={String(option.value)}
          value={option.value}
          isChecked={selectedValues.includes(option.value)}
          onToggle={() => handleToggle(option.value as T)}
          iconType={iconType}
          label={option.label}
        />
      ))}
    </div>
  );
}
