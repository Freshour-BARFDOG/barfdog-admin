import { pointColor } from "@/styles/common.css";
import Text from "@/components/common/text/Text";
import StatListLayout from "@/components/pages/dashboard/common/statList/StatListLayout";
import StatRow from "@/components/pages/dashboard/common/statList/StatRow";
import StatItem from "@/components/pages/dashboard/common/statList/StatItem";
import { Question } from "@/types/dashboard";

interface InquiryStatProps {
	data: Question;
}

export default function InquiryStat({
	data,
}: InquiryStatProps) {
	return (
		<StatListLayout title='1:1 문의' width='sm'>
			<StatRow columns={1}>
				<StatItem
					items={[
						{
							label: '답변 대기',
							value: (
								<Text type='label1'>
									<span className={pointColor}>{data.unansweredCount}</span> 건
								</Text>
							)
						},
						{ label: '답변 완료', value: `${data.answeredCount} 건` },
					]}
				/>
			</StatRow>
		</StatListLayout>
	);
}