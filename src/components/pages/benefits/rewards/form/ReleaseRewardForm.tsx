'use client';
import * as styles from "@/components/pages/benefits/Benefits.css";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Controller } from "react-hook-form";
import Card from "@/components/common/card/Card";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import BenefitTargetSelector from "@/components/pages/benefits/common/BenefitTargetSelector";
import GroupTarget from "@/components/pages/benefits/common/groupTarget/GroupTarget";
import PersonalTarget from "@/components/pages/benefits/common/personalTarget/PersonalTarget";
import Text from "@/components/common/text/Text";
import InputField from "@/components/common/inputField/InputField";
import FormControls from "@/components/common/formControls/FormControls";
import Form from "@/components/common/form/Form";
import { useToastStore } from "@/store/useToastStore";
import { defaultValues, getRewardSchemaByTarget } from "@/utils/validation/benefits/reward/releaseReward";
import { REWARD_LIST_INITIAL_SEARCH_VALUES, REWARD_TARGET_LIST } from "@/constants/benefits/rewards";
import { useFormHandler } from "@/hooks/useFormHandler";
import { formatNumberWithComma, unformatCommaNumber } from "@/utils/formatNumber";
import { ReleaseRewardFormValues, ReleaseRewardRequestBody, RewardTarget } from "@/types/benefits/rewards";
import { useReleaseReward } from "@/api/rewards/mutations/useReleaseReward";
import { queryKeys } from "@/constants/queryKeys";

export default function ReleaseRewardForm() {
	const router = useRouter();
	const queryClient = useQueryClient();

	const [rewardTarget, setRewardTarget] = useState<RewardTarget>('GROUP');
	const schema = useMemo(() => getRewardSchemaByTarget(rewardTarget), [rewardTarget]);
	const {
		control,
		handleSubmit,
		setValue,
		isValid,
		trigger,
	} = useFormHandler<ReleaseRewardFormValues>(schema, defaultValues, 'all');

	const { mutate } = useReleaseReward();
	const { addToast } = useToastStore();

	useEffect(() => {
		trigger(); // schema가 바뀌었을 때 강제 유효성 검사
	}, [schema]);

	const onSubmit = (data: ReleaseRewardFormValues) => {
		const common = {
			name: data.name,
			amount: data.amount,
			alimTalk: data.alimTalk,
		};

		let targetData = {};
		switch (rewardTarget) {
			case 'PERSONAL':
				targetData = { memberIdList: data.memberIdList };
				break;

			case 'GROUP':
				targetData = {
					subscribe: data.subscribe,
					longUnconnected: data.longUnconnected,
					gradeList: data.gradeList,
					area: data.area,
					birthYearFrom: data.birthYearFrom,
					birthYearTo: data.birthYearTo,
				};
				break;
			default:
				break;
		}

		const requestBody = {
			...common,
			...targetData,
		} as ReleaseRewardRequestBody;

		mutate({
			rewardTarget: rewardTarget,
			body: requestBody,
		}, {
			onSuccess: async () => {
				addToast('적립금 발행이 완료되었습니다!');
				await queryClient.invalidateQueries({
					queryKey: [
						queryKeys.REWARDS.BASE,
						queryKeys.REWARDS.GET_REWARD_LIST,
						0,
						REWARD_LIST_INITIAL_SEARCH_VALUES
					],
				});
				setTimeout(() => {
					router.push(`/rewards`);
				}, 200);
			},
			onError: (error) => {
				console.log(error);
				addToast('적립금 발행에 실패했습니다.\n관리자에게의 문의해주세요.')
			}
		})
	};
	return (
		<>
			<Card shadow='none' padding={20}>
				<Form>
					<Controller
						control={control}
						name='name'
						render={({ field }) => (
							<InputFieldGroup label='적립금 이름'>
								<InputField
									{...field}
								/>
							</InputFieldGroup>
						)}
					/>
					<BenefitTargetSelector<ReleaseRewardFormValues, RewardTarget>
						targetValue={rewardTarget}
						setTargetValue={setRewardTarget}
						options={REWARD_TARGET_LIST}
						setValue={setValue}
					/>
					{rewardTarget === 'GROUP' &&
            <GroupTarget<ReleaseRewardFormValues> control={control} setValue={setValue} trigger={trigger} />
					}
					{rewardTarget === 'PERSONAL' &&
            <PersonalTarget<ReleaseRewardFormValues> setValue={setValue} trigger={trigger} />
					}
					<Controller
						control={control}
						name='amount'
						render={({ field }) => (
							<InputFieldGroup
								label='발행 적립금'
							>
								<div className={styles.benefitInputBox}>
									<div className={styles.benefitInput({})}>
										<InputField
											value={formatNumberWithComma(field.value)}
											onChange={(e) => {
												const raw = unformatCommaNumber(e.target.value);
												field.onChange(raw);
											}}
											name={field.name}
										/>
									</div>
									<Text type='body3'>원 이상</Text>
								</div>
							</InputFieldGroup>
						)}
					/>
					<Controller
						control={control}
						name='alimTalk'
						render={({ field }) => (
							<InputFieldGroup label='알림톡 발송' divider={false}>
								<LabeledRadioButtonGroup
									options={[
										{ label: 'Y', value: true },
										{ label: 'N', value: false },
									]}
									{...field}
								/>
							</InputFieldGroup>
						)}
					/>
				</Form>
			</Card>
			<FormControls
				cancelText='목록'
				confirmText='적립금 발행'
				onCancel={() => router.push('/rewards')}
				onConfirm={handleSubmit(onSubmit)}
				isConfirmDisabled={!isValid}
			/>
		</>
	);
}