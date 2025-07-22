import Wrapper from "@/components/layout/wrapper/Wrapper";
import CreateAlliance from "@/components/pages/alliance/management/create/CreateAlliance";

export default async function CreateMainBannerPage() {
  return (
    <Wrapper title='제휴사 등록'>
      <CreateAlliance />
    </Wrapper>
  );
}
