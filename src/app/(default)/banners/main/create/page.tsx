import Wrapper from "@/components/layout/wrapper/Wrapper";
import MainBannerCreate from "@/components/pages/banners/main/create/MainBannerCreate";

export default async function CreateMainBannerPage() {
  return (
    <Wrapper title='메인 배너 등록'>
      <MainBannerCreate />
    </Wrapper>
  );
}
