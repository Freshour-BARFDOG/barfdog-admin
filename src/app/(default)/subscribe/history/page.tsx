import { Suspense } from "react";
import Loader from "@/components/common/loader/Loader";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import SubscribeHistory from "@/components/pages/subscribe/history/SubscribeHistory";

export default function SubscribeHistoryPage() {
  return (
    <Suspense fallback={<Loader fullscreen />}>
      <Wrapper title="구독 히스토리">
        <SubscribeHistory />
      </Wrapper>
    </Suspense>
  );
}
