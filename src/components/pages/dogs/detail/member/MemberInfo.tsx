import { useGetMemberDetail } from "@/api/member/queries/useGetMemberDetail";
import DetailTable from "@/components/common/detailTable/DetailTable";
import { TableItem } from "@/types/common";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { format, parseISO } from "date-fns";

interface MemberInfoProps {
  memberId: number;
}

export default function MemberInfo({ memberId }: MemberInfoProps) {
  const { data } = useGetMemberDetail(memberId);
  const infoList: TableItem[] = [
    {
      label: "이름",
      value: data.memberDto.name,
    },
    {
      label: "생일",
      value: format(parseISO(data.memberDto.birthday), "yyyy-MM-dd"),
    },
    { label: "아이디", value: data.memberDto.email },
    { label: "연락처", value: formatPhoneNumber(data.memberDto.phoneNumber) },
    {
      label: "주소",
      value: `${data.memberDto.address.street} ${data.memberDto.address.city} ${data.memberDto.address.detailAddress}`,
      fullWidth: true,
    },
  ];
  return <DetailTable items={infoList} columns={2} title="회원 정보" />;
}
