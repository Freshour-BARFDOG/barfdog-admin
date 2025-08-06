import Wrapper from "@/components/layout/wrapper/Wrapper";
import CreateEvent from "@/components/pages/community/event/create/CreateEvent";

export const metadata = {
  title: '관리자 | 이벤트 등록',
};

export default async function CreateEventPage() {
  return (
    <Wrapper title='이벤트 등록'>
      <CreateEvent />
    </Wrapper>
  );
}
