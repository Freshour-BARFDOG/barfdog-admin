import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import Loader from "@/components/common/loader/Loader";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import CreatePromotion from "@/components/pages/benefits/promotions/create/CreatePromotion";
import { prefetchGetPromotionCouponList } from "@/api/promotions/queries/prefetchGetPromotionCouponList";

export const metadata = {
  title: '관리자 | 프로모션 생성',
};

export default async function CreatePromotionPage() {
	const queryClient = new QueryClient();
	await prefetchGetPromotionCouponList(queryClient);
	const dehydrateState = dehydrate(queryClient);
	return (
		<HydrationBoundary state={dehydrateState}>
			<ErrorBoundary fallback={<div>프로모션 생성에 필요한 정보가 없습니다.</div>}>
				<Suspense fallback={<Loader fullscreen />}>
					<Wrapper title='프로모션 생성'>
						<CreatePromotion />
					</Wrapper>
				</Suspense>
			</ErrorBoundary>
		</HydrationBoundary>
	);
}
