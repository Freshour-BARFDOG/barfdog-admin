import { useQuery } from "@tanstack/react-query";
import { UseSuspenseQueryCustomOptions } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";
import { TopBannerData } from "@/types/banners";
import { getTopBanner } from "@/api/banners/banners";

export function useGetTopBanner(queryOptions?: UseSuspenseQueryCustomOptions<TopBannerData>) {
	return useQuery<TopBannerData>({
		queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_TOP_BANNER],
		queryFn: () => getTopBanner(),
		...queryOptions,
	})
}
