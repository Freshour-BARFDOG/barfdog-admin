import { ComponentType, Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { UseMutateFunction, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/useToastStore";
import Card from "@/components/common/card/Card";

interface BannerMutationVariables<TFormValues> {
  body: TFormValues;
  pcFile: File | null;
  mobileFile: File | null;
}

interface BannerCreateProps<TFormValues> {
	FormComponent: ComponentType<{
		onSubmit: (formValues: TFormValues) => void;
		setPcFile: Dispatch<SetStateAction<File | null>>;
		setMobileFile: Dispatch<SetStateAction<File | null>>;
		isValidFiles: boolean;
	}>;
	mutationFn: UseMutateFunction<
		unknown, // response type (성공시 반환값), 필요 시 바꿀 수 있음
		unknown, // error type
		BannerMutationVariables<TFormValues>, // variables type
		unknown  // context type
	>;
	queryKeyToInvalidate: unknown[];
	title: string;
	redirectPath: string;
}

export default function CreateBanner<TFormValues>({
	FormComponent,
	mutationFn,
	queryKeyToInvalidate,
	title,
	redirectPath,
}: BannerCreateProps<TFormValues>) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { addToast } = useToastStore();

	const [pcFile, setPcFile] = useState<File | null>(null);
	const [mobileFile, setMobileFile] = useState<File | null>(null);

	const onSubmit = (formValues: TFormValues) => {
		mutationFn({
			body: formValues,
			pcFile,
			mobileFile,
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: queryKeyToInvalidate });
				addToast(`${title} 등록이 완료되었습니다!`);
				router.push(redirectPath);
			},
			onError: () => {
				addToast('등록에 실패했습니다.\n관리자에게 문의해주세요.');
			}
		});
	};

	return (
		<Card shadow="none" padding={20}>
			<FormComponent
				onSubmit={onSubmit}
				setPcFile={setPcFile}
				setMobileFile={setMobileFile}
				isValidFiles={!!pcFile && !!mobileFile}
			/>
		</Card>
	);
}