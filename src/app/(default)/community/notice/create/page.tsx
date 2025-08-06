import Wrapper from "@/components/layout/wrapper/Wrapper";
import CreateNotice from "@/components/pages/community/notice/create/CreateNotice";

export const metadata = {
  title: '관리자 | 공지사항 등록',
};

export default async function CreateNoticePage() {
  return (
    <Wrapper title='공지사항 등록'>
      <CreateNotice />
    </Wrapper>
  );
}
