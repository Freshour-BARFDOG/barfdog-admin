"use client";

import { commonWrapper, pointColor } from "@/styles/common.css";
import { ChangeEvent, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Controller,
  ControllerRenderProps,
  UseFormReturn,
} from "react-hook-form";
import Card from "@/components/common/card/Card";
import Button from "@/components/common/button/Button";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import Text from "@/components/common/text/Text";
import InputField from "@/components/common/inputField/InputField";
import {
  unformatCommaNumber,
  formatNumberWithComma,
} from "@/utils/formatNumber";

import LabeledCheckboxGroup from "@/components/common/labeledCheckBoxGroup/LabeledCheckBoxGroup";
import Divider from "@/components/common/divider/Divider";
import Textarea from "@/components/common/textarea/Textarea";
import { inputFieldStyle } from "../general/GeneralProduct.css";
import {
  RawProductFormKeys,
  RawProductFormValues,
} from "@/utils/validation/products/rawProduct";
import { SelectOption } from "@/types/common";
import FileUpload from "@/components/common/fileUpload/FileUpload";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import TooltipInfo from "@/components/common/tooltip/TooltipInfo";
import { ProductVisibilityStatus } from "@/types/products";
import { BOOLEAN_OPTIONS, ITEM_STATUS_OPTIONS } from "@/constants/products";
import { useGetIngredientList } from "@/api/products/queries/useGetIngredientList";
import { parseAndClampNumber } from "@/utils/parseAndClampNumber";

interface InputFieldItem {
  name: RawProductFormKeys;
  label: string | ReactNode;
  isRequired?: boolean;
  render: (
    field: ControllerRenderProps<RawProductFormValues, RawProductFormKeys>
  ) => ReactNode;
}

interface RawProductFormProps {
  form: UseFormReturn<RawProductFormValues>;
  defaultRecipeUrl?: string;
  defaultSurveyUrl?: string;
  recipeFileName?: string;
  surveyFileName?: string;
  recipeFile: File | null;
  surveyFile: File | null;
  onRecipeFileChange: (f: File | null) => void;
  onSurveyFileChange: (f: File | null) => void;
  onSubmit: (data: RawProductFormValues) => void;
}

export default function RawProductForm({
  form,
  defaultRecipeUrl,
  defaultSurveyUrl,
  recipeFileName,
  surveyFileName,
  recipeFile,
  surveyFile,
  onRecipeFileChange,
  onSurveyFileChange,
  onSubmit,
}: RawProductFormProps) {
  const router = useRouter();
  const [newIngredientText, setNewIngredientText] = useState("");

  const { data: ingData } = useGetIngredientList();
  const [ingredientOptions, setIngredientOptions] = useState<
    SelectOption<string>[]
  >((ingData ?? []).map((i) => ({ value: i, label: i })));
  console.log("ingredientOptions", ingredientOptions);

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = form;

  const handleAddIngredient = (newIng: string) => {
    if (ingredientOptions.some((o) => o.value === newIng)) return;
    setIngredientOptions((prev) => [...prev, { value: newIng, label: newIng }]);
  };

  const canSubmit =
    isValid &&
    (!!recipeFile || !!defaultRecipeUrl) &&
    (!!surveyFile || !!defaultSurveyUrl);

  const InputFieldList: InputFieldItem[] = [
    {
      name: "name",
      label: "레시피 이름",
      render: (field) => (
        <InputField value={field.value as string} onChange={field.onChange} />
      ),
    },
    {
      name: "description",
      label: "레시피 설명",
      render: (field) => (
        <Textarea
          value={field.value as string}
          onChange={field.onChange}
          error={errors.description?.message}
        />
      ),
    },
    {
      name: "uiNameKorean",
      label: "한글 노출명",
      render: (field) => (
        <InputField value={field.value as string} onChange={field.onChange} />
      ),
    },
    {
      name: "uiNameEnglish",
      label: "영어 노출명",
      render: (field) => (
        <InputField value={field.value as string} onChange={field.onChange} />
      ),
    },
    {
      name: "pricePerGram",
      label: "가격 상수",
      render: (field) => (
        <div className={commonWrapper({ gap: 8, justify: "start" })}>
          <div className={inputFieldStyle}>
            <InputField
              type="number"
              value={field.value as number}
              onChange={(e) => field.onChange(e.target.value)}
            />
          </div>
          <Text type="body3">원 / g</Text>
        </div>
      ),
    },
    {
      name: "gramPerKcal",
      label: "무게 상수",
      render: (field) => (
        <div className={commonWrapper({ gap: 8, justify: "start" })}>
          <div className={inputFieldStyle}>
            <InputField
              type="number"
              value={field.value as number}
              onChange={(e) => field.onChange(e.target.value)}
            />
          </div>
          <Text type="body3">g / Kcal</Text>
        </div>
      ),
    },
    {
      name: "descriptionForSurvey",
      label: (
        <TooltipInfo
          title={
            <>
              추천 문구 <span className={pointColor}>*</span>
            </>
          }
        >
          노출 위치
          <br />
          1. 설문조사 ‘특별히 챙겨주고 싶은 부분’
          <br />
          2. 플랜, 레시피 선택페이지의 설문결과 설명란
        </TooltipInfo>
      ),
      isRequired: false,
      render: (field) => (
        <InputField value={field.value as string} onChange={field.onChange} />
      ),
    },
    {
      name: "ingredients",
      label: "재료",
      render: (field) => (
        <div
          className={commonWrapper({
            direction: "col",
            align: "start",
            gap: 8,
          })}
        >
          <InputField
            value={newIngredientText}
            onChange={(e) => setNewIngredientText(e.target.value)}
            confirmButton
            confirmButtonText="추가"
            onSubmit={() => {
              const v = newIngredientText.trim();
              if (!v) return;
              handleAddIngredient(v); // 옵션에도 추가
              setNewIngredientText(""); // 입력필드 초기화
            }}
          />
          <LabeledCheckboxGroup<string>
            options={ingredientOptions}
            selectedValues={field.value as string[]}
            onChange={field.onChange}
          />
        </div>
      ),
    },
    {
      name: "leaked",
      label: (
        <TooltipInfo
          title={
            <>
              노출 여부 <span className={pointColor}>*</span>
            </>
          }
        >
          플랜,레시피 페이지의 목록에 노출합니다.
        </TooltipInfo>
      ),
      isRequired: false,
      render: (field) => (
        <LabeledRadioButtonGroup<ProductVisibilityStatus>
          options={ITEM_STATUS_OPTIONS}
          value={field.value as ProductVisibilityStatus}
          onChange={field.onChange}
        />
      ),
    },
    {
      name: "inStock",
      label: (
        <TooltipInfo
          title={
            <>
              재고 여부 <span className={pointColor}>*</span>
            </>
          }
        >
          1. 품절된 레시피는 신규설문조사에서 구입 불가능합니다.
          <br />
          2. 품절된 레시피를 구독 중인 고객은 결제 중지됩니다.
          <br />
          3. 알림톡으로 품절안내 메시지가 전송됩니다.
          <br />
          4. 유저는 사이트 접속 시, 안내창을 통해 품절상태를 확인하게 됩니다.
        </TooltipInfo>
      ),
      isRequired: false,
      render: (field) => (
        <div>
          <LabeledRadioButtonGroup<boolean>
            options={BOOLEAN_OPTIONS}
            value={field.value as boolean}
            onChange={field.onChange}
          />
          <Text type="caption" color="red">
            품절 처리된 레시피를 구독 중인 고객은 결제 중지됩니다.
          </Text>
        </div>
      ),
    },
  ];

  const imageList = [
    {
      title: "recipeThumb",
      label: (
        <TooltipInfo
          title={
            <>
              레시피 이미지 <span className={pointColor}>*</span>
            </>
          }
        >
          1. 썸네일 상단의 글자는 이미지로 삽입해야합니다. 2. 플랜, 레시피
          페이지의 레시피 썸네일에 노출
        </TooltipInfo>
      ),
      linkName: "recipeLinkUrl",
      defaultImageUrl: defaultRecipeUrl ?? "",
      imageName: recipeFileName ?? "",
      caption: "이미지 권장사이즈: 260 x 260(1:1 비율 권장)",
      width: 300,
      height: 300,
      onFileChange: onRecipeFileChange,
    },
    {
      title: "surveyResult",
      label: (
        <TooltipInfo
          title={
            <>
              설문 이미지 <span className={pointColor}>*</span>
            </>
          }
        >
          플랜, 레시피 페이지의 설문결과에 노출
        </TooltipInfo>
      ),
      linkName: "surveyLinkUrl",
      defaultImageUrl: defaultSurveyUrl ?? "",
      imageName: surveyFileName ?? "",
      caption: "이미지 권장사이즈: 320 x 320(1:1 비율 권장)",
      width: 300,
      height: 300,
      onFileChange: onSurveyFileChange,
    },
  ];

  return (
    <>
      <Card shadow="none" padding={20}>
        <div className={commonWrapper({ direction: "col", gap: 12 })}>
          {InputFieldList.map((input, index) => (
            <Controller
              control={control}
              key={input.name}
              name={input.name}
              render={({ field }) => (
                <InputFieldGroup
                  label={input.label}
                  isLabelRequired={input.isRequired === undefined}
                  divider={index !== InputFieldList.length - 1}
                >
                  {input.render(field)}
                </InputFieldGroup>
              )}
            />
          ))}
          <Divider thickness={1} color="gray200" />

          {imageList.map((image, index) => (
            <InputFieldGroup
              label={image.label}
              isLabelRequired={false}
              divider
              key={image.title}
            >
              <FileUpload
                inputId={`file-input-${image.title.toLowerCase()}`}
                onFileChange={image.onFileChange}
                defaultImageUrl={image.defaultImageUrl}
                imageName={image.imageName}
                fullWidth={image.title === "PC"}
                width={image.width}
                height={image.height}
                objectFit="contain"
                caption={image.caption}
              />
            </InputFieldGroup>
          ))}
        </div>
      </Card>
      <div className={commonWrapper({ gap: 8, padding: 20 })}>
        <Button
          onClick={() => router.push("/products/raw")}
          variant="outline"
          type="assistive"
        >
          취소
        </Button>
        <Button onClick={handleSubmit(onSubmit)} disabled={!canSubmit}>
          등록
        </Button>
      </div>
    </>
  );
}
