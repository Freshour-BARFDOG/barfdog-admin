import { commonWrapper } from "@/styles/common.css";
import { SelectOption } from "@/types/common";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";

interface LabeledCheckboxGroupProps<T extends string = string> {
  options: SelectOption<T>[];
  selectedValues: T[];
  onChange: (selected: T[]) => void;
  iconType?: "square" | "circle";
  className?: string;
}

export default function LabeledCheckboxGroup<T extends string = string>({
  options,
  selectedValues,
  onChange,
  iconType = "square",
  className = "",
}: LabeledCheckboxGroupProps) {
  const handleToggle = (value: T) => {
    const isSelected = selectedValues.includes(value);
    const newSelected = isSelected
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newSelected);
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
