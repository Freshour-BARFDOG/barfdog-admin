import ReleaseCouponForm from "@/components/pages/benefits/coupons/form/releaseCouponForm/ReleaseCouponForm";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import Loader from "@/components/common/loader/Loader";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import { prefetchGetPublicationCouponList } from "@/api/coupons/queries/prefetchGetPublicationCouponList";
import { prefetchGetMemberList } from "@/api/member/queries/prefetchGetMemberList";

export const metadata = {
  title: '관리자 | 쿠폰 발행',
};

export default async function ReleaseCouponPage() {
	const queryClient = new QueryClient();
	await prefetchGetPublicationCouponList(queryClient);
	await prefetchGetMemberList(queryClient);
	const dehydrateState = dehydrate(queryClient);
	return (
		<HydrationBoundary state={dehydrateState}>
			<ErrorBoundary fallback={<div>쿠폰 발행에 필요한 정보가 없습니다.</div>}>
				<Suspense fallback={<Loader fullscreen />}>
					<Wrapper title='쿠폰 발행'>
						<ReleaseCouponForm />
					</Wrapper>
				</Suspense>
			</ErrorBoundary>
		</HydrationBoundary>

	);
}
