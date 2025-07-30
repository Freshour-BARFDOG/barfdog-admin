import { useMemo, useState } from "react";

import { useUpdateGrams } from "@/api/subscribe/mutations/useUpdateGrams";
import { useUpdateNextPaymentDate } from "@/api/subscribe/mutations/useUpdateNextPaymentDate";
import { useUpdateNextPaymentPrice } from "@/api/subscribe/mutations/useUpdateNextPaymentPrice";
import { useUpdatePlanAndRecipe } from "@/api/subscribe/mutations/useUpdatePlanAndRecipe";
import { useGetSubscribeDetail } from "@/api/subscribe/queries/useGetSubscribeDetail";

import Button from "@/components/common/button/Button";
import DateTimePicker from "@/components/common/dateTimePicker/DateTimePicker";
import DetailTable from "@/components/common/detailTable/DetailTable";
import Divider from "@/components/common/divider/Divider";
import InputField from "@/components/common/inputField/InputField";
import LabeledCheckboxGroup from "@/components/common/labeledCheckBoxGroup/LabeledCheckBoxGroup";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import Text from "@/components/common/text/Text";

import { PLAN_OPTIONS, SUBSCRIBE_STATUS } from "@/constants/subscribe";
import { commonWrapper } from "@/styles/common.css";

import type { TableItem } from "@/types/common";
import type { Plan } from "@/types/subscribe";
import { format, parseISO } from "date-fns";
import {
  formatNumberWithComma,
  unformatCommaNumber,
} from "@/utils/formatNumber";
import { useMutationToast } from "@/hooks/useMutaionToast";

interface SubscribeInfoProps {
  subscribeId: number;
}

export default function SubscribeInfo({ subscribeId }: SubscribeInfoProps) {
  // API 훅
  const { data } = useGetSubscribeDetail(subscribeId);

  const { mutate: updateGrams } = useUpdateGrams(subscribeId);
  const { mutate: updatePlanAndRecipe } = useUpdatePlanAndRecipe(subscribeId);
  const { mutate: updateNextPaymentPrice } =
    useUpdateNextPaymentPrice(subscribeId);
  const { mutate: updateNextPaymentDate } =
    useUpdateNextPaymentDate(subscribeId);

  const { subscribeDto, recipeDtoList, subscribeRecipeDtoList } = data;

  // 초기 레시피와 그램수 설정
  const initialRecipes = subscribeRecipeDtoList.map((r) => r.recipeId);
  const initialGrams = subscribeDto.oneMealGramsPerRecipe
    ? subscribeDto.oneMealGramsPerRecipe
        .split(",")
        .map((g) => parseFloat(g.trim()))
    : [];

  // 상태 관리 훅
  const [newPaymentPrice, setNewPaymentPrice] = useState(
    subscribeDto.nextPaymentPrice
  );
  const [nextPaymentDate, setNextPaymentDate] = useState<Date | null>(
    subscribeDto.nextPaymentDate ? parseISO(subscribeDto.nextPaymentDate) : null
  );
  const [selectedRecipe, setSelectedRecipe] =
    useState<number[]>(initialRecipes);
  const [plan, setPlan] = useState<Plan>(subscribeDto.plan);
  const [grams, setGrams] = useState<number[]>(initialGrams);

  // 레시피 옵션 생성
  const recipeOptions = useMemo(() => {
    return recipeDtoList.map((recipe) => ({
      value: recipe.id,
      label: recipe.name,
    }));
  }, [recipeDtoList]);

  const mutateToast = useMutationToast();

  const handleUpdateNextPaymentDate = () => {
    if (!nextPaymentDate) return;
    mutateToast(
      updateNextPaymentDate,
      {
        subscribeId,
        nextPaymentDate: format(nextPaymentDate, "yyyy-MM-dd-HH-mm"),
      },
      "다음 결제일이 변경되었습니다.",
      "다음 결제일 변경에 실패했습니다."
    );
  };

  const handleUpdateNextPaymentPrice = () => {
    mutateToast(
      updateNextPaymentPrice,
      { subscribeId, newPaymentPrice },
      "다음 결제 원금이 변경되었습니다.",
      "다음 결제 원금 변경에 실패했습니다."
    );
  };

  const handleUpdateGrams = () => {
    mutateToast(
      updateGrams,
      { subscribeId, grams: grams.join(",") },
      "그램수가 변경되었습니다.",
      "그램수 변경에 실패했습니다."
    );
  };

  const handleUpdatePlanAndRecipe = () => {
    mutateToast(
      updatePlanAndRecipe,
      {
        subscribeId,
        body: {
          plan,
          recipeIdList: selectedRecipe,
          nextPaymentPrice: newPaymentPrice,
        },
      },
      "플랜과 레시피가 변경되었습니다.",
      "플랜과 레시피 변경에 실패했습니다."
    );
  };

  // 테이블 아이템 생성
  const infoList: TableItem[] = [
    {
      label: "구독 상태",
      value: SUBSCRIBE_STATUS[subscribeDto.subscribeStatus],
    },
    {
      label: "구독 회차",
      value: subscribeDto.subscribeCount,
    },
    {
      label: "다음 결제일",
      value: subscribeDto.nextPaymentDate ? (
        <div className={commonWrapper({ gap: 8, justify: "start" })}>
          <DateTimePicker
            value={nextPaymentDate}
            onChange={(e) => setNextPaymentDate(e ? new Date(e) : null)}
          />
          <Button
            size="sm"
            variant="outline"
            onClick={handleUpdateNextPaymentDate}
          >
            변경
          </Button>
        </div>
      ) : (
        "-"
      ),
    },
    {
      label: "다음 결제 원금",
      value:
        subscribeDto.subscribeStatus === "SUBSCRIBING" ? (
          <InputField
            value={formatNumberWithComma(newPaymentPrice)}
            onChange={(e) =>
              setNewPaymentPrice(unformatCommaNumber(e.target.value))
            }
            unit="원"
            confirmButton
            confirmButtonText="변경"
            onSubmit={handleUpdateNextPaymentPrice}
          />
        ) : (
          "-"
        ),
    },
    {
      label: "등급 할인 금액",
      value: `${formatNumberWithComma(subscribeDto.discountGrade)}원`,
    },
    {
      label: "쿠폰 할인 금액",
      value: `${formatNumberWithComma(subscribeDto.discountCoupon)}원`,
    },
    {
      label: "추천 그램수",
      value: (
        <div className={commonWrapper({ gap: 4, justify: "start" })}>
          {grams.length > 0
            ? grams.map((gram, index) => (
                <Text key={index} type="body3">
                  {gram}
                </Text>
              ))
            : "-"}
        </div>
      ),
    },
    {
      label: "구독 그램수",
      value:
        subscribeDto.subscribeStatus === "SUBSCRIBING" ? (
          <div
            className={commonWrapper({
              gap: 12,
              direction: "col",
              align: "start",
            })}
          >
            {subscribeRecipeDtoList.map((rec, idx) => (
              <div
                key={rec.recipeId}
                className={commonWrapper({ gap: 8, justify: "start" })}
              >
                <Text type="body3" noShrink>
                  {rec.recipeName}
                </Text>
                <InputField
                  value={String(grams[idx])}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value) || 0;
                    setGrams((prev) => {
                      const next = [...prev];
                      next[idx] = v;
                      return next;
                    });
                  }}
                  unit="g"
                />
              </div>
            ))}
            <Button size="sm" variant="outline" onClick={handleUpdateGrams}>
              변경
            </Button>
          </div>
        ) : (
          "-"
        ),
    },
    {
      label: "플랜/레시피",
      value:
        subscribeDto.subscribeStatus === "SUBSCRIBING" ? (
          <div
            className={commonWrapper({
              gap: 8,
              direction: "col",
              align: "start",
            })}
          >
            <LabeledRadioButtonGroup<Plan>
              options={PLAN_OPTIONS}
              value={plan}
              onChange={(value) => setPlan(value)}
            />
            <Divider color="gray300" thickness={1} />
            <LabeledCheckboxGroup<number>
              options={recipeOptions}
              selectedValues={selectedRecipe}
              onChange={(value) => setSelectedRecipe(value)}
            />
            <Button
              size="sm"
              variant="outline"
              onClick={handleUpdatePlanAndRecipe}
            >
              변경
            </Button>
          </div>
        ) : (
          "-"
        ),
      fullWidth: true,
    },
  ];
  return <DetailTable items={infoList} columns={2} title="구독 정보" />;
}
