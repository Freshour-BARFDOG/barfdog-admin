'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/common/card/Card";
import MainBannerForm from "@/components/pages/banners/main/form/MainBannerForm";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { useToastStore } from "@/store/useToastStore";
import { MainBannerFormValues } from "@/types/banners";
import { useCreateMainBanner } from "@/api/banners/mutations/useCreateMainBanner";

export default function MainBannerCreate() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { mutate } = useCreateMainBanner();

	const [pcFile, setPcFile] = useState<File | null>(null);
	const [mobileFile, setMobileFile] = useState<File | null>(null);

	const { addToast } = useToastStore();

	const onSubmit = (formValues: MainBannerFormValues) => {
		mutate({
			body: formValues,
			pcFile,
			mobileFile,
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_MAIN_BANNER_LIST],
				});
				addToast('메인 배너 등록이 완료되었습니다!');
				router.push('/banners/main');
			},
			onError: (error) => {
				console.log(error)
				addToast('메인 배너 등록에 실패했습니다.\n관리자에게 문의해주세요.');
			}
		})
	}

	return (
		<Card shadow='none' padding={20}>
			<MainBannerForm
				onSubmit={onSubmit}
				setPcFile={setPcFile}
				setMobileFile={setMobileFile}
				isValidFiles={!!pcFile && !!mobileFile}
			/>
		</Card>
	);
}