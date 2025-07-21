'use client';
import { useRouter } from "next/navigation";
import { commonWrapper } from "@/styles/common.css";
import Button from "@/components/common/button/Button";
import InquiryQuestion from "@/components/pages/community/inquiry/detail/question/InquiryQuestion";
import InquiryAnswers from "@/components/pages/community/inquiry/detail/answers/InquiryAnswers";
import { useGetInquiryDetail } from "@/api/community/queries/useGetInquiryDetail";

interface InquiryDetailProps {
	inquiryId: number;
}

export default function InquiryDetail({ inquiryId }: InquiryDetailProps) {
	const router = useRouter();
	const { data } = useGetInquiryDetail(inquiryId);

	if (!data) return null;
	return (
		<div className={commonWrapper({ direction: 'col', gap: 20 })}>
			<InquiryQuestion question={data.question} />
			{data.answers.length > 0 &&
				<InquiryAnswers inquiryId={inquiryId} answers={data.answers}  />
			}
			<div className={commonWrapper({ gap: 4 })}>
				<Button onClick={() => router.push(`/community/inquiry`)} variant='outline'>목록</Button>
				<Button onClick={() => router.push(`/community/inquiry/${inquiryId}/create-answer`)} variant='solid'>답글 작성</Button>
			</div>
		</div>
	);
}