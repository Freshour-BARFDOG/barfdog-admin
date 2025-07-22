'use client';
import { commonWrapper } from "@/styles/common.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormHandler } from "@/hooks/useFormHandler";
import { Controller } from "react-hook-form";
import InputField from "@/components/common/inputField/InputField";
import Card from "@/components/common/card/Card";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import Form from "@/components/common/form/Form";
import FormControls from "@/components/common/formControls/FormControls";
import AddEventInput from "@/components/pages/alliance/common/addEventInput/AddEventInput";
import Text from "@/components/common/text/Text";
import { queryKeys } from "@/constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/useToastStore";
import { allianceSchema } from "@/utils/validation/alliance/alliance";
import { AllianceManagementFormValues } from "@/types/alliance";
import { useCreateAlliance } from "@/api/alliance/mutations/useCreateAlliance";
import { isAxiosError } from "axios";

const defaultUpdateFormValue = {
	allianceName: '',
	allianceCode: '',
	eventNameList: [],
}

export default function CreateAlliance() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { addToast } = useToastStore();

	const {
		control,
		setError,
		handleSubmit,
		isValid,
		errors,
	} = useFormHandler<AllianceManagementFormValues>(allianceSchema, defaultUpdateFormValue, 'all');
	const [eventError, setEventError] = useState('');

	const { mutate } = useCreateAlliance();

	const onSubmit = (data: AllianceManagementFormValues) => {
		mutate({
			body: data,
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					predicate: (query) =>
						query.queryKey[0] === queryKeys.ALLIANCE.BASE &&
						query.queryKey[1] === queryKeys.ALLIANCE.GET_ALLIANCE_MANAGEMENT,
				});
				addToast('등록이 완료되었습니다!');
				router.replace('/alliance/management');
			},
			onError: (error) => {
				if (isAxiosError(error)) {
					const errorData = error?.response?.data;
					const errorMessage = errorData?.message ?? '알 수 없는 오류입니다.';
					const key = errorData?.errorCode === '4002' ? 'allianceName' : 'allianceCode';

					setError(key, { message: errorMessage });

					if (error?.response?.status === 500) {
						addToast('등록에 실패했습니다\n관리자에게 문의해주세요.');
					}
				} else {
					addToast('등록에 실패했습니다\n관리자에게 문의해주세요.');
				}
			
			}
		})
	}

	return (
		<div className={commonWrapper({ direction: 'col', gap: 12, width: 'full', align: 'start' })}>
			<Text type='label4' color='red'>입력된 사항은 수정이 불가능하니 정확한 값을 입력해주세요</Text>
			<div className={commonWrapper({ width: 'full', direction: 'col' })}>
				<Card shadow="none" padding={20}>
					<Form>
						<Controller
							control={control}
							name='allianceName'
							render={({ field }) => (
								<InputFieldGroup label='제휴사 이름' align='start'>
									<InputField
										error={errors.allianceName?.message ?? ''}
										{...field}
									/>
								</InputFieldGroup>
							)}
						/>
						<Controller
							control={control}
							name='allianceCode'
							render={({ field }) => (
								<InputFieldGroup label='Prefix' align='start'>
									<div className={commonWrapper({ direction: 'col', gap: 8, align: 'start' })}>
										<InputField
											error={errors.allianceCode?.message ?? ''}
											value={field.value}
											onChange={(e) => {
												const filtered = e.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 2);
												field.onChange(filtered);
											}}
											placeholder="영문 2자 입력"
										/>
										<div>
											<Text type='caption' block>
												- 입력한 항목이 쿠폰 코드의 앞자리에 기입되어 난수쿠폰이 생성됩니다.
											</Text>
											<Text type='caption' block>
												- Prefix는 영문만 입력이 가능합니다. 예) TU 입력 시 난수쿠폰 코드 : TUOOOOOOOO
											</Text>
										</div>
									</div>
								</InputFieldGroup>
							)}
						/>
						<Controller
							control={control}
							name='eventNameList'
							render={({ field }) => (
								<InputFieldGroup label='행사' align='start' isLabelRequired={false} divider={false}>
									<AddEventInput
										eventNameList={field.value}
										setEventNameList={field.onChange}
										eventError={eventError}
										setEventError={setEventError}
										caption='- 제휴사마다 행사를 여러 개 등록할 수 있습니다. 행사 추가 및 삭제는 제휴사 상세보기에서 가능합니다.'
									/>
								</InputFieldGroup>
							)}
						/>
					</Form>
				</Card>
				<FormControls
					cancelText='취소'
					confirmText='등록'
					onCancel={() => router.back()}
					onConfirm={handleSubmit(onSubmit)}
					isConfirmDisabled={!isValid}
				/>
			</div>
		</div>
	);
}