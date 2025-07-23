import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import CreateAllianceCoupon from "@/components/pages/alliance/coupon/create/CreateAllianceCoupon";
import { prefetchGetAllianceEventList } from "@/api/alliance/queries/prefetchGetAllianceEventList";

export default async function CreateAllianceCouponPage() {
	const queryClient = new QueryClient();
	await prefetchGetAllianceEventList(queryClient);
	const dehydrateState = dehydrate(queryClient);
	return (
		<HydrationBoundary state={dehydrateState}>
			<ErrorBoundary fallback={<div>이벤트 옵션 내역이 없습니다.</div>}>
				<Suspense fallback={<Loader fullscreen />}>
					<Wrapper title='난수 쿠폰 생성'>
						<CreateAllianceCoupon />
					</Wrapper>
				</Suspense>
			</ErrorBoundary>
		</HydrationBoundary>

	);
}
