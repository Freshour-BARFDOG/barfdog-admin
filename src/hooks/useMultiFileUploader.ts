import { useCallback, useState } from "react";
import { ImageFile } from "@/types/common";

export default function useMultiFileUploader({
	initialFiles = [],
	maxFiles,
}: {
	initialFiles: ImageFile[];
	maxFiles: number;
}) {
	const [files, setFiles] = useState<ImageFile[]>(initialFiles);
	const [errors, setErrors] = useState<string[]>([]);

	const addFiles = useCallback((newFiles: FileList | File[]) => {
		setErrors([]);

		const fileArray = Array.from(newFiles).map(file => ({
			filename: file.name,
			url: URL.createObjectURL(file),
		}));

		setFiles(prev => {
			const totalFiles = prev.length + fileArray.length;
			if (totalFiles > maxFiles) {
				setErrors([`최대 ${maxFiles}개의 이미지만 업로드할 수 있습니다.`]);
				return prev;
			}
			return [...prev, ...fileArray];
		});
	}, []);

	const removeFile = useCallback((filename: string) => {
		setFiles(prev => prev.filter(file => file.filename !== filename));
	}, []);

	const clearFiles = useCallback(() => {
		files.forEach(file => URL.revokeObjectURL(file.url));
		setFiles([]);
	}, [files]);

	return {
		files,
		addFiles,
		removeFile,
		clearFiles,
		errors,
	}
}