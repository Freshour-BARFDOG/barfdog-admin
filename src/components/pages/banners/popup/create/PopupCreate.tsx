'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/common/card/Card";
import PopupForm from "@/components/pages/banners/popup/form/PopupForm";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { useToastStore } from "@/store/useToastStore";
import { PopupFormValues } from "@/types/banners";
import { useCreatePopup } from "@/api/banners/mutations/useCreatePopup";

export default function PopupCreate() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { mutate } = useCreatePopup();

	const [pcFile, setPcFile] = useState<File | null>(null);
	const [mobileFile, setMobileFile] = useState<File | null>(null);

	const { addToast } = useToastStore();

	const onSubmit = (formValues: PopupFormValues) => {
		mutate({
			body: formValues,
			pcFile,
			mobileFile,
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_POPUP_LIST],
				});
				addToast('팝업 등록이 완료되었습니다!');
				router.push('/banners/popup');
			},
			onError: (error) => {
				console.log(error)
				addToast('팝업 등록에 실패했습니다.\n관리자에게 문의해주세요.');
			}
		})
	}

	return (
		<Card shadow='none' padding={20}>
			<PopupForm
				onSubmit={onSubmit}
				setPcFile={setPcFile}
				setMobileFile={setMobileFile}
				isValidFiles={!!pcFile && !!mobileFile}
			/>
		</Card>
	);
}