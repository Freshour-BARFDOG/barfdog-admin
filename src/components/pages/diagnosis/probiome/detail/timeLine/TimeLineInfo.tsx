import Card from "@/components/common/card/Card";
import DetailTable from "@/components/common/detailTable/DetailTable";
import { TableItem } from "@/types/common";
import { AnalysisTimelineInfo } from "@/types/diagnosis";

interface TimeLineInfoProps {
  timLineData: AnalysisTimelineInfo;
}

export default function TimeLineInfo({ timLineData }: TimeLineInfoProps) {
  const infoList: TableItem[] = [
    {
      label: "결과지 업로드일",
      value: timLineData.reportCompletedDate ?? "-",
      fullWidth: true,
    },
    {
      label: "분석 요청 완료일",
      value: timLineData.sentLabDate ?? "-",
      fullWidth: true,
    },
    {
      label: "회수 완료일",
      value: timLineData.pickupCompletedDate ?? "-",
      fullWidth: true,
    },
  ];
  return (
    <Card padding={20}>
      <DetailTable items={infoList} columns={2} title="상태 변경 이력" />
    </Card>
  );
}
