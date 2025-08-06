import { Suspense } from "react";
import Loader from "@/components/common/loader/Loader";
import DogList from "@/components/pages/dogs/list/DogList";
import Wrapper from "@/components/layout/wrapper/Wrapper";

export const metadata = {
  title: '관리자 | 반려견 관리',
};

export default async function DogPage() {
  return (
    <Suspense fallback={<Loader fullscreen />}>
      <Wrapper title="반려견 관리">
        <DogList />
      </Wrapper>
    </Suspense>
  );
}
