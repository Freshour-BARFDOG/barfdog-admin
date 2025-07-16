import Wrapper from "@/components/layout/wrapper/Wrapper";
import PopupCreate from "@/components/pages/banners/popup/create/PopupCreate";

export default async function CreateMainBannerPage() {
  return (
    <Wrapper title='팝업 등록'>
      <PopupCreate />
    </Wrapper>
  );
}
