import { ImageFile } from "@/types/common";
import { Path, PathValue, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useToastStore } from "@/store/useToastStore";
import { UploadResponse } from "@/types/community";

interface UseMultiImageUploaderProps<T extends Record<string, any>> {
	uploadFn: (file: File) => Promise<UploadResponse>;
	imageOrderKey: string; // 예: 'imageOrderDtoList'
	addImageIdKey?: string;
	deleteImageIdKey?: string;
	imageList?: ImageFile[]; // defaultUpdateFormValue.imageOrderDtoList 같은 초기 리스트
	setValue: UseFormSetValue<T>;
	watch: UseFormWatch<T>;
}

export function useMultiImageUploader<T extends Record<string, any>>({
	uploadFn,
	imageOrderKey,
	addImageIdKey,
	deleteImageIdKey,
	imageList = [],
	setValue,
	watch,
}: UseMultiImageUploaderProps<T>) {
	const { addToast } = useToastStore();
	const imageOrder = imageOrderKey as Path<T>;

	const handleFileUpload = async (files: File[]) => {
		const currentOrderList = [...(watch(imageOrder) as ImageFile[] ?? [])];

		try {
			const results = await Promise.all(
				files.map(file =>
					uploadFn(file).then(({ id, url }) => ({
						id,
						url,
						filename: file.name,
					}))
				)
			);

			const newIds = results.map(res => res.id);
			const newOrderList = results.map((res, i) => ({
				...res,
				leakOrder: currentOrderList.length + 1 + i,
			}));

			if (addImageIdKey) {
				const addImageId = addImageIdKey as Path<T>;
				const currentAddIds = (watch(addImageId) ?? []) as unknown as number[];
				setValue(addImageId, Array.from(new Set([...currentAddIds, ...newIds])) as PathValue<T, typeof addImageId>);
			}

			setValue(imageOrder, [...currentOrderList, ...newOrderList] as PathValue<T, typeof imageOrder>);

		} catch (err) {
			console.error(err);
			addToast('이미지 업로드에 실패했습니다.\n관리자에게 문의해주세요.');
		}
	};

	const handleFileRemove = (id: number | undefined, filename: string) => {
		let currentId = id;

		if (currentId === undefined) {
			const found = imageList?.find(img => img.filename === filename);
			if (!found) {
				addToast('이미지를 찾을 수 없습니다.');
				return;
			}
			currentId = found.id;
		}

		const isExisting = imageList?.some(img => img.id === currentId);

		if (isExisting && deleteImageIdKey && currentId !== undefined) {
			const deleteImageId = deleteImageIdKey as Path<T>;

			const currentDeleteIds = (watch(deleteImageId) ?? []) as unknown as number[];;
			setValue(deleteImageId, [...currentDeleteIds, currentId] as PathValue<T, typeof deleteImageId>);
		}

		if (addImageIdKey && currentId !== undefined) {
			const addImageId = addImageIdKey as Path<T>;

			const currentAddIds = watch(addImageId) ?? [];
			setValue(addImageId, (currentAddIds as number[]).filter((imgId: number) => imgId !== currentId) as PathValue<T, typeof addImageId>);
		}

		const updatedOrder = (watch(imageOrder) as ImageFile[] ?? [])
			.filter((img: ImageFile) => img.id !== currentId)
			.map((img: ImageFile, idx: number) => ({
				...img,
				leakOrder: idx + 1,
			}));

		setValue(imageOrder, updatedOrder as PathValue<T, typeof imageOrder>, { shouldValidate: true });
	};

	return {
		handleFileUpload,
		handleFileRemove,
	};
}