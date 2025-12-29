"use client";

import React from "react";
import {
  useFieldArray,
  Controller,
  Control,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import InputField from "@/components/common/inputField/InputField";
import Button from "@/components/common/button/Button";
import { formatNumberWithComma } from "@/utils/formatNumber";
import * as styles from "./OptionField.css";
import { commonWrapper } from "@/styles/common.css";
import { GeneralProductFormValues } from "@/utils/validation/products/generalProduct";
import { parseAndClampNumber } from "@/utils/parseAndClampNumber";

interface OptionFieldProps {
  isEdit: boolean;
  control: Control<GeneralProductFormValues>;
  setValue: UseFormSetValue<GeneralProductFormValues>;
}

/**
 * OptionField 컴포넌트 (Controller 사용, useWatch 적용)
 * - 등록: itemOptionSaveDtoList
 * - 수정:
 *   • itemOptionSaveDtoList: 새로 추가된 옵션
 *   • itemOptionUpdateDtoList: 기존 옵션 유지/수정
 *   • deleteOptionIdList: 삭제된 옵션 ID
 */
export default function OptionField({
  isEdit,
  control,
  setValue,
}: OptionFieldProps) {
  // 신규 옵션 배열
  const saveFA = useFieldArray({
    control,
    name: "itemOptionSaveDtoList",
  });
  // 기존 옵션(수정 모드)
  const updateFA = useFieldArray({
    control,
    name: "itemOptionUpdateDtoList",
    keyName: "fieldId", // 내부 UUID 필드를 fieldId 로 분리
  });
  // 삭제된 옵션 ID 리스트
  const deleteIds = useWatch({
    control,
    name: "deleteOptionIdList",
  }) as number[] | undefined;

  const removeSave = (idx: number) => {
    saveFA.remove(idx);
  };

  const removeUpdate = (idx: number) => {
    // removed.id 는 이제 form 데이터의 숫자 ID
    const removed = updateFA.fields[idx];
    setValue(
      "deleteOptionIdList",
      Array.from(new Set([...(deleteIds || []), removed.id]))
    );
    updateFA.remove(idx);
  };

  const handleAddOption = () => {
    saveFA.append({ name: "", price: 0, remaining: 0 });
  };

  const hasOptions = isEdit
    ? updateFA.fields.length > 0 || saveFA.fields.length > 0
    : saveFA.fields.length > 0;

  return (
    <div
      className={commonWrapper({ direction: "col", align: "start", gap: 8 })}
    >
      {hasOptions && (
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
            {isEdit &&
              updateFA.fields.map((field, idx) => (
                <tr key={field.fieldId}>
                  <td className={styles.td}>
                    <Controller
                      control={control}
                      name={`itemOptionUpdateDtoList.${idx}.name`}
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
                      control={control}
                      name={`itemOptionUpdateDtoList.${idx}.price`}
                      render={({ field }) => (
                        <InputField
                          value={formatNumberWithComma(field.value)}
                          onChange={(e) =>
                            field.onChange(
                              parseAndClampNumber({
                                rawInput: e.target.value,
                                mode: "normal",
                              })
                            )
                          }
                          unit="원"
                        />
                      )}
                    />
                  </td>
                  <td className={styles.td}>
                    <Controller
                      control={control}
                      name={`itemOptionUpdateDtoList.${idx}.remaining`}
                      render={({ field }) => (
                        <InputField
                          type="number"
                          value={String(field.value)}
                          onChange={(e) =>
                            field.onChange(
                              parseAndClampNumber({
                                rawInput: e.target.value,
                                mode: "normal",
                              })
                            )
                          }
                          unit="개"
                        />
                      )}
                    />
                  </td>
                  <td className={styles.td}>
                    <Button size="sm" onClick={() => removeUpdate(idx)}>
                      삭제
                    </Button>
                  </td>
                </tr>
              ))}

            {saveFA.fields.map((field, idx) => (
              <tr key={field.id}>
                <td className={styles.td}>
                  <Controller
                    control={control}
                    name={`itemOptionSaveDtoList.${idx}.name`}
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
                    control={control}
                    name={`itemOptionSaveDtoList.${idx}.price`}
                    render={({ field }) => (
                      <InputField
                        value={formatNumberWithComma(field.value)}
                        onChange={(e) =>
                          field.onChange(
                            parseAndClampNumber({
                              rawInput: e.target.value,
                              mode: "normal",
                            })
                          )
                        }
                        unit="원"
                      />
                    )}
                  />
                </td>
                <td className={styles.td}>
                  <Controller
                    control={control}
                    name={`itemOptionSaveDtoList.${idx}.remaining`}
                    render={({ field }) => (
                      <InputField
                        value={String(field.value)}
                        onChange={(e) =>
                          field.onChange(
                            parseAndClampNumber({
                              rawInput: e.target.value,
                              mode: "normal",
                            })
                          )
                        }
                        unit="개"
                      />
                    )}
                  />
                </td>
                <td className={styles.td}>
                  <Button size="sm" onClick={() => removeSave(idx)}>
                    삭제
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Button size="sm" variant="outline" onClick={handleAddOption}>
        옵션추가
      </Button>
    </div>
  );
}
