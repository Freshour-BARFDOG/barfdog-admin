import Wrapper from "@/components/layout/wrapper/Wrapper";
import CreatePopup from "@/components/pages/banners/popup/create/CreatePopup";

export default async function CreatePopupPage() {
  return (
    <Wrapper title='팝업 등록'>
      <CreatePopup />
    </Wrapper>
  );
}
