import { ComponentType, Dispatch, SetStateAction, useState } from 'react';
import Card from "@/components/common/card/Card";
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/useToastStore";

interface BannerDetailProps<FormValues, DetailData> {
	id: number;
	title: string;
	data: DetailData; 
	defaultFormValues: (data: DetailData) => FormValues;
	mutateFn: (params: { id: number; body: FormValues; pcFile: File | null; mobileFile: File | null }) => void;
	queryKeysToInvalidate: unknown[];
	FormComponent: ComponentType<{
		defaultUpdateFormValue: FormValues;
		onSubmit: (form: FormValues) => void;
		setPcFile: Dispatch<SetStateAction<File | null>>;
		setMobileFile: Dispatch<SetStateAction<File | null>>;
		isValidFiles: boolean;
	}>;
}

export default function BannerDetail<FormValues, DetailData>({
	id,
	title,
	data,
	defaultFormValues,
	mutateFn,
	queryKeysToInvalidate,
	FormComponent,
}: BannerDetailProps<FormValues, DetailData>) {
	const queryClient = useQueryClient();
	const { addToast } = useToastStore();

	const [pcFile, setPcFile] = useState<File | null>(null);
	const [mobileFile, setMobileFile] = useState<File | null>(null);

	const handleSubmit = async (formValues: FormValues) => {
		if (!data) return;
		try {
			await mutateFn({
				id,
				body: formValues,
				pcFile,
				mobileFile,
			});

			await Promise.all(
				queryKeysToInvalidate.map((key) =>
					queryClient.invalidateQueries({ queryKey: key as readonly unknown[] }),
				),
			);

			setPcFile(null);
			setMobileFile(null);
			addToast(`${title} 수정이 완료되었습니다!`);
		} catch (error) {
			console.log(error);
			addToast(`${title} 수정에 실패했습니다.\n관리자에게 문의해주세요.`);
		}
	};

	const defaultValues = defaultFormValues(data);

	return (
		<Card shadow="none" padding={20}>
			<FormComponent
				defaultUpdateFormValue={defaultValues}
				onSubmit={handleSubmit}
				setPcFile={setPcFile}
				setMobileFile={setMobileFile}
				isValidFiles={true}
			/>
		</Card>
	);
}