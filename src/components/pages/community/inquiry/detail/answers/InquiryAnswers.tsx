import { Fragment } from "react";
import { commonWrapper } from "@/styles/common.css";
import { inquiryContent } from "@/components/pages/community/inquiry/detail/InquiryDetail.css";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import DetailTable from "@/components/common/detailTable/DetailTable";
import Text from "@/components/common/text/Text";
import FileDownloadItem from "@/components/common/fileDownloadItem/FileDownloadItem";
import Card from "@/components/common/card/Card";
import Button from "@/components/common/button/Button";
import Divider from "@/components/common/divider/Divider";
import ImageCarousel from "@/components/common/imageCarousel/ImageCarousel";
import { queryKeys } from "@/constants/queryKeys";
import { useToastStore } from "@/store/useToastStore";
import { InquiryAnswerData } from "@/types/community";
import { downloadFile } from "@/api/community/community";
import { useDeleteInquiry } from "@/api/community/mutations/useDeleteInquiry";
import { TableItem } from "@/types/common";

interface InquiryAnswersProps {
	inquiryId: number;
	answers: InquiryAnswerData[];
}

export default function InquiryAnswers({
	inquiryId,
	answers,
}: InquiryAnswersProps) {
	const queryClient = useQueryClient();
	const { addToast } = useToastStore();
	const { mutate } = useDeleteInquiry();

	const handleDelete = (id: number) => {
		mutate({ id }, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.COMMUNITY.BASE, queryKeys.COMMUNITY.GET_INQUIRY_DETAIL, inquiryId],
				});
				addToast('답글 삭제가 완료되었습니다!');
			},
			onError: (error) => {
				console.log(error)
				addToast('답글 삭제에 실패했습니다.\n관리자에게 문의해주세요.');
			}
		})
	}

	const handleDownload = async (fileId: number, filename: string) => {
		try {
			await downloadFile(fileId, filename);
		} catch (error) {
			console.error('파일 다운로드 실패:', error);
		}
	};

	const defaultInfoList = (answer: InquiryAnswerData): TableItem[] => {
		return [
			{ label: '답변 제목', value: answer.title },
			{ label: '등록일', value: format(new Date(answer.createdDate), 'yyyy-MM-dd HH:mm:ss') },
			{
				label: '첨부 파일',
				value: (
					<div className={commonWrapper({ direction: 'col', gap: 4, align: 'start' })}>
						{answer.questionImgDtoList.length > 0
							? answer.questionImgDtoList.map(file => (
								<FileDownloadItem
									key={file.questionImageId}
									handleDownload={() => handleDownload(file.questionImageId, file.filename)}
									filename={file.filename}
								/>
							))
							: '첨부 파일이 없습니다.'
						}
						{answer.questionImgDtoList.length > 0 &&
	            <ImageCarousel
	              imageList={answer.questionImgDtoList}
	              width={100}
	              height={100}
	            />
						}
					</div>
				),
				fullWidth: true
			},
			{
				label: '답변글',
				value: <Text className={inquiryContent} type='body3' preLine>{answer.contents}</Text>,
				fullWidth: true,
				align: 'center',
			},
		];
	}

	return (
		<Card shadow='none' padding={20} gap={20}>
			{answers.map((answer, index) => (
				<Fragment key={answer.id}>
					<div className={commonWrapper({ width: 'full', direction: 'col', gap: 8, align: 'end' })}>
						<DetailTable items={defaultInfoList(answer)} title={index === 0 ? '답변 내용' : ''} columns={2} />
						<Button onClick={() => handleDelete(answer.id)} variant='outline' type='assistive' size='sm'>삭제</Button>
					</div>
					{index !== answers?.length - 1 &&
						<Divider thickness={1} color='gray200' />
					}
				</Fragment>
			))}
		</Card>
	);
}