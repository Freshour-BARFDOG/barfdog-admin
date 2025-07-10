import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import Loader from "@/components/common/loader/Loader";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import ReleaseRewardForm from "@/components/pages/benefits/rewards/form/ReleaseRewardForm";
import { prefetchGetMemberList } from "@/api/member/queries/usePrefetchGetMemberList";

export default async function ReleaseRewardPage() {
	const queryClient = new QueryClient();
	await prefetchGetMemberList(queryClient);
	const dehydrateState = dehydrate(queryClient);
	return (
		<HydrationBoundary state={dehydrateState}>
			<ErrorBoundary fallback={<div>적립금 발행에 필요한 정보가 없습니다.</div>}>
				<Suspense fallback={<Loader fullscreen />}>
					<Wrapper title='적립금 발행'>
						<ReleaseRewardForm />
					</Wrapper>
				</Suspense>
			</ErrorBoundary>
		</HydrationBoundary>

	);
}
