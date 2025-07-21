'use client';
import { commonWrapper } from "@/styles/common.css";
import useModal from "@/hooks/useModal";
import FullModal from "@/components/common/modal/fullModal/FullModal";
import InputLabel from "@/components/common/inputLabel/InputLabel";
import InquiryQuestion from "@/components/pages/community/inquiry/detail/question/InquiryQuestion";
import CreateAnswerForm from "@/components/pages/community/inquiry/create/form/CreateAnswerForm";
import { useGetInquiryDetail } from "@/api/community/queries/useGetInquiryDetail";

interface CreateAnswerProps {
	inquiryId: number;
}

export default function CreateAnswer({ inquiryId }: CreateAnswerProps) {
	const { data } = useGetInquiryDetail(inquiryId);
	const { isOpen, onClose, onToggle } = useModal();

	if (!data) return null;
	return (
		<div className={commonWrapper({ direction: 'col', gap: 20, align: 'start' })}>
			<div>
				<InputLabel label='- 작성된 답변 및 문의내용은 원문 보존을 위해 수정할 수 없습니다.' labelColor='gray700' />
				<InputLabel label='- 답글 작성 시, 알림톡 수신에 동의한 유저에게 알림톡이 발송됩니다.' labelColor='gray700' />
			</div>
			<CreateAnswerForm
				targetId={inquiryId}
				handleShowQuestion={onToggle}
			/>
			{isOpen &&
				<FullModal title='원글' isVisible={isOpen} handleClose={onClose}>
          <InquiryQuestion question={data.question} />
				</FullModal>
			}
		</div>
	);
}