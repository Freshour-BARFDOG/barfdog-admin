import Wrapper from "@/components/layout/wrapper/Wrapper";
import CreateAlliance from "@/components/pages/alliance/management/create/CreateAlliance";

export const metadata = {
  title: '관리자 | 제휴사 등록',
};

export default async function CreateAlliancePage() {
  return (
    <Wrapper title='제휴사 등록'>
      <CreateAlliance />
    </Wrapper>
  );
}
