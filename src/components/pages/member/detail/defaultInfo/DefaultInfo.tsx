import * as styles from './DefaultInfo.css';
import { infoItemValue } from "@/components/pages/member/detail/MemberDetail.css";
import { useState } from "react";
import { format, parse } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import InfoList from "@/components/common/infoList/InfoList";
import DatePicker from "@/components/common/datePicker/DatePicker";
import Button from "@/components/common/button/Button";
import InputField from "@/components/common/inputField/InputField";
import useModal from "@/hooks/useModal";
import AddressModal from "@/components/common/modal/addressModal/AddressModal";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { useToastStore } from "@/store/useToastStore";
import { AddressData } from "@/types/member";
import { queryKeys } from "@/constants/queryKeys";
import { useUpdateMemberBirthday } from "@/api/member/mutations/useUpdateMemberBirthday";
import { useUpdateMemberAddress } from "@/api/member/mutations/useUpdateMemberAddress";
import { infoItem } from '@/types/common';

interface DefaultInfoData {
	name: string;
	email: string;
	phoneNumber: string;
	birthday: string;
	address: AddressData;
}

interface DefaultInfoProps {
	memberId: number;
	data: DefaultInfoData;
}

export default function DefaultInfo({
	memberId,
	data,
}: DefaultInfoProps) {
	const queryClient = useQueryClient();

	// 문자열 Date 객체로 파싱 (형식: yyyyMMdd)
	const parsedDate = parse(data?.birthday, 'yyyyMMdd', new Date());
	const formattedBirthday = format(parsedDate, 'yyyy-MM-dd');
	const [newBirthday, setNewBirthday] = useState<string>(formattedBirthday);

	const [newAddress, setNewAddress] = useState<AddressData>({
		city: data?.address?.city || '',
		deliveryName: data?.address?.deliveryName || '',
		detailAddress: data?.address?.detailAddress || '',
		street: data?.address?.street || '',
		zipcode: data?.address?.zipcode || '',
	})

	const { mutate: updateBirthday } = useUpdateMemberBirthday();
	const { mutate: updateAddress } = useUpdateMemberAddress();

	const { isOpen: isOpenAddressModal, onClose: onCloseAddressModal, onToggle: onToggleAddressModal } = useModal();
	const { addToast } = useToastStore();

	const handleUpdateBirthday = () => {
		if (formattedBirthday === newBirthday) {
			addToast('생년월일이 동일합니다!');
			return;
		}
		updateBirthday({
			memberId: memberId,
			birthday: newBirthday,
		}, {
			onSuccess: () => {
				addToast('생년월일 수정이 완료되었습니다!');
			},
			onError: (error) => {
				console.log(error)
				addToast('생년월일 수정에 실패했습니다');
			}
		})
	}

	const handleUpdateAddress = () => {
		updateAddress({
			memberId: memberId,
			address: newAddress,
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.MEMBER.BASE, queryKeys.MEMBER.GET_MEMBER_DETAIL, memberId],
				});
				addToast('주소 변경이 완료되었습니다!');
			},
			onError: (error) => {
				console.log(error)
				addToast('주소 변경에 실패했습니다');
			}
		})
	}

	const defaultInfo: infoItem[] = [
		{ label: '이름', value: data.name },
		{
			label: '생년월일',
			value: (
				<div className={infoItemValue}>
					<DatePicker value={newBirthday} onChange={(e) => setNewBirthday(e.target.value)} />
					<Button onClick={handleUpdateBirthday} variant='outline' size='sm'>변경</Button>
				</div>
			),
		},
		{ label: '아이디', value: data.email },
		{ label: '연락처', value: formatPhoneNumber(data.phoneNumber) },
		{
			label: '주소',
			value: (
				<>
					<div className={styles.addressInfo}>
						<InputField
							value={newAddress.street}
							disabled
							confirmButton
							confirmButtonText='주소검색'
							confirmButtonVariant='outline'
							onSubmit={onToggleAddressModal}
						/>
						<InputField
							value={newAddress.detailAddress}
							onChange={(e) => setNewAddress({ ...newAddress, detailAddress: e.target.value })}
							confirmButton
							confirmButtonText='변경'
							confirmButtonVariant='solid'
							onSubmit={handleUpdateAddress}
						/>
					</div>
				</>
			),
			align: 'start',
		},
	];

	return (
		<>
			<InfoList
				title='기본 정보'
				items={defaultInfo}
				width='calc(60% - 10px)'
			/>
			{isOpenAddressModal &&
	    	<AddressModal
	        isOpen={isOpenAddressModal}
	        onClose={onCloseAddressModal}
	        onSelectAddressData={(data) => {
						setNewAddress({
							...newAddress,
							city: data.sido,
							street: data.address,
							zipcode: data.zonecode,
							detailAddress: '',
						})
					}}
	      />
			}
		</>
	);
}