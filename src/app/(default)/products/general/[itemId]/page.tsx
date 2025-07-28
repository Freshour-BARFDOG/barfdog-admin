import { Suspense } from "react";
import Loader from "@/components/common/loader/Loader";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import GeneralProductEdit from "@/components/pages/products/general/GeneralProductEdit";
import { PageProps } from "@/types/common";

type Params = { itemId: string };

export default async function GeneralProductCreatePage({ params }: PageProps<Params>) {
  const resolvedParams = await params;
  const itemId = Number(resolvedParams.itemId);
  return (
    <Suspense fallback={<Loader fullscreen />}>
      <Wrapper title="일반 상품 수정">
        <GeneralProductEdit itemId={itemId} />
      </Wrapper>
    </Suspense>
  );
}
