import Wrapper from "@/components/layout/wrapper/Wrapper";
import CreateMainBanner from "@/components/pages/banners/main/create/CreateMainBanner";

export const metadata = {
  title: '관리자 | 메인 배너 등록',
};

export default async function CreateMainBannerPage() {
  return (
    <Wrapper title='메인 배너 등록'>
      <CreateMainBanner />
    </Wrapper>
  );
}
