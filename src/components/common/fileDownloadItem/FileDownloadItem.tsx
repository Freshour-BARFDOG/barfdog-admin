import { commonWrapper } from "@/styles/common.css";
import { Download } from "lucide-react";

interface FileDownloadItemProps {
	filename: string;
	handleDownload: () => void;
}

export default function FileDownloadItem({
	filename,
	handleDownload,
}: FileDownloadItemProps) {
	return (
		<button
			onClick={handleDownload}
			className={commonWrapper({ gap: 8, align: 'center', justify: 'start' })}
		>
			<Download size={16} />
			{filename}
		</button>
	);
}