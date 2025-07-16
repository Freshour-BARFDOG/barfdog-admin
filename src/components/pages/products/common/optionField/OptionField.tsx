"use client";

import React from "react";
import { useFieldArray, Controller, Control } from "react-hook-form";
import InputField from "@/components/common/inputField/InputField";
import Button from "@/components/common/button/Button";
import {
  formatNumberWithComma,
  unformatCommaNumber,
} from "@/utils/formatNumber";
import * as styles from "./OptionField.css";
import { commonWrapper } from "@/styles/common.css";

interface OptionFieldProps {
  control: Control<any>;
}

export default function OptionField({ control }: OptionFieldProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "itemOptionSaveDtoList",
  });

  return (
    <div
      className={commonWrapper({ direction: "col", align: "start", gap: 8 })}
    >
      {fields.length > 0 && (
        <table className={styles.optionTable}>
          <thead>
            <tr>
              <th className={styles.th}>옵션명</th>
              <th className={styles.th}>옵션가</th>
              <th className={styles.th}>재고수량</th>
              <th className={styles.th}>삭제</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, idx) => (
              <tr key={field.id}>
                <td className={styles.td}>
                  <Controller
                    name={`itemOptionSaveDtoList.${idx}.name`}
                    control={control}
                    render={({ field }) => (
                      <InputField
                        placeholder="옵션명"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </td>
                <td className={styles.td}>
                  <Controller
                    name={`itemOptionSaveDtoList.${idx}.price`}
                    control={control}
                    render={({ field }) => (
                      <InputField
                        value={formatNumberWithComma(field.value)}
                        onChange={(e) =>
                          field.onChange(unformatCommaNumber(e.target.value))
                        }
                        unit="원"
                      />
                    )}
                  />
                </td>
                <td className={styles.td}>
                  <Controller
                    name={`itemOptionSaveDtoList.${idx}.remaining`}
                    control={control}
                    render={({ field }) => (
                      <InputField
                        value={String(field.value)}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        unit="개"
                      />
                    )}
                  />
                </td>
                <td className={styles.td}>
                  <Button size="sm" onClick={() => remove(idx)}>
                    삭제
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Button
        size="sm"
        variant="outline"
        onClick={() => append({ name: "", price: 0, remaining: 0 })}
      >
        옵션추가
      </Button>
    </div>
  );
}
