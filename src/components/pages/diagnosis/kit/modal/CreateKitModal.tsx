"use client";

import ModalBackground from "@/components/common/modal/modalBackground/ModalBackground";
import * as styles from "./CreateKitModal.css";
import { commonWrapper, pointColor } from "@/styles/common.css";
import InputField from "@/components/common/inputField/InputField";
import SelectBox from "@/components/common/selectBox/SelectBox";
import { DiagnosisKitType } from "@/types/diagnosis";
import { DIAGNOSIS_KIT_TYPE_CATEGORY_OPTIONS } from "@/constants/diagnosis";
import { Controller, UseFormReturn } from "react-hook-form";

import Text from "@/components/common/text/Text";
import { DiagnosisKitFormValues } from "@/utils/validation/diagnosis/diagnosis";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import { handleChangeNumberType } from "@/utils/formatNumber";
interface CreateKitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateKit: () => void;
  form: UseFormReturn<DiagnosisKitFormValues>;
}

export default function CreateKitModal({
  isOpen,
  onClose,
  onCreateKit,
  form,
}: CreateKitModalProps) {
  const {
    control,
    reset,
    formState: { isValid },
  } = form;

  const handleCancelCreate = () => {
    reset();
    onClose();
  };

  return (
    <ModalBackground
      isVisible={isOpen}
      onClose={onClose}
      isDimmed
      closeOnBackgroundClick={false}
    >
      <div
        className={styles.kitModalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <Text type="title4">진단 키트 번호 생성하기</Text>
        <div
          className={commonWrapper({
            direction: "col",
            align: "start",
            gap: 20,
          })}
        >
          <Controller
            control={control}
            name="kitName"
            render={({ field }) => (
              <InputField
                {...field}
                label="키트명"
                isRequired
                placeholder="(내부 관리용) 키트명 입력"
              />
            )}
          />
          <div className={commonWrapper({ direction: "col", align: "start" })}>
            <Text type="body3" color="gray700">
              키트 타입<span className={pointColor}> *</span>
            </Text>
            <Controller
              control={control}
              name="kitType"
              render={({ field }) => (
                <SelectBox<DiagnosisKitType>
                  {...field}
                  options={DIAGNOSIS_KIT_TYPE_CATEGORY_OPTIONS}
                  fullWidth
                />
              )}
            />
          </div>
          <Controller
            control={control}
            name="kitCount"
            render={({ field }) => (
              <InputField
                {...field}
                value={field.value}
                onChange={(e) => handleChangeNumberType(e, field)}
                label="생성 개수"
                isRequired
                placeholder="생성할 키트 개수를 입력해 주세요 (1~100개)"
              />
            )}
          />
          <Controller
            control={control}
            name="manufacturer"
            render={({ field }) => (
              <InputField
                {...field}
                label="제조사"
                isRequired
                placeholder="제조사 입력"
              />
            )}
          />
        </div>
        <ButtonDocked
          type="dual-button"
          primaryButtonLabel="생성하기"
          secondaryButtonLabel="취소"
          onSecondaryClick={handleCancelCreate}
          onPrimaryClick={onCreateKit}
          isPrimaryDisabled={!isValid}
          position="sticky"
          isBorder={false}
          isPadding={false}
        />
      </div>
    </ModalBackground>
  );
}
