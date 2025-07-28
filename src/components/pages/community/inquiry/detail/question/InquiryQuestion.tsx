import { format } from "date-fns";
import { commonWrapper } from "@/styles/common.css";
import { inquiryContent } from "@/components/pages/community/inquiry/detail/InquiryDetail.css";
import Chips from "@/components/common/chips/Chips";
import DetailTable from "@/components/common/detailTable/DetailTable";
import Text from "@/components/common/text/Text";
import FileDownloadItem from "@/components/common/fileDownloadItem/FileDownloadItem";
import Card from "@/components/common/card/Card";
import ImageCarousel from "@/components/common/imageCarousel/ImageCarousel";
import { INQUIRY_STATUS } from "@/constants/community";
import { InquiryQuestionData } from "@/types/community";
import { downloadFile } from "@/api/community/community";
import { TableItem } from "@/types/common";

interface InquiryQuestionProps {
	question: InquiryQuestionData
}

export default function InquiryQuestion({
	question
}: InquiryQuestionProps) {

	const handleDownload = async (fileId: number, filename: string) => {
		try {
			await downloadFile(fileId, filename);
		} catch (error) {
			console.error('파일 다운로드 실패:', error);
		}
	};

	const defaultInfoList: TableItem[] = [
		{
			label: '답변 상태',
			value: (
				<Chips size='sm' variant='solid' color='red'>{INQUIRY_STATUS[question.answerStatus]}</Chips>
			),
			fullWidth: true
		},
		{ label: '작성자', value: question.name },
		{ label: '이메일', value: question.email },
		{ label: '제목', value: question.title },
		{ label: '등록일', value: format(new Date(question.createdDate), 'yyyy-MM-dd HH:mm:ss') },
		{
			label: '첨부 파일',
			value: (
				<div className={commonWrapper({ direction: 'col', gap: 4, align: 'start' })}>
					{question.questionImgDtoList.length > 0
						? question.questionImgDtoList.map(file => (
							<FileDownloadItem
								key={file.questionImageId}
								handleDownload={() => handleDownload(file.questionImageId, file.filename)}
								filename={file.filename}
							/>
						))
						: '첨부 파일이 없습니다.'
					}
					{question.questionImgDtoList.length > 0 &&
	          <ImageCarousel
	            imageList={question.questionImgDtoList}
	            width={100}
	            height={100}
	          />
					}
				</div>
			),
			fullWidth: true
		},
		{
			label: '문의 내용',
			value: <Text className={inquiryContent} type='body3' preLine>{question.contents}</Text>,
			fullWidth: true,
			align: 'center',
		},
	];

	return (
		<Card shadow='none' padding={20} gap={20}>
			<DetailTable items={defaultInfoList} title='문의 내용' columns={2} />
		</Card>
	);
}