import { useQuery } from "@tanstack/react-query";
import { UseSuspenseQueryCustomOptions } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";
import { MyPageBannerData } from "@/types/banners";
import { getMyPageBanner } from "@/api/banners/banners";

export function useGetMyPageBanner(queryOptions?: UseSuspenseQueryCustomOptions<MyPageBannerData>) {
	return useQuery<MyPageBannerData>({
		queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_MYPAGE_BANNER],
		queryFn: () => getMyPageBanner(),
		...queryOptions,
	})
}
