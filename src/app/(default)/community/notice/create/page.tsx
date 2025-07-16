import Wrapper from "@/components/layout/wrapper/Wrapper";
import CreateNotice from "@/components/pages/community/notice/create/CreateNotice";

export default async function CreateMainBannerPage() {
  return (
    <Wrapper title='공지사항 등록'>
      <CreateNotice />
    </Wrapper>
  );
}
