import { useQuery } from "@tanstack/react-query";
import { UseSuspenseQueryCustomOptions } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";
import { MainBannerListrData } from "@/types/banners";
import { getBannerList } from "@/api/banners/banners";

export function useGetMainBannerList(queryOptions?: UseSuspenseQueryCustomOptions<MainBannerListrData[]>) {
	return useQuery<MainBannerListrData[]>({
		queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_MAIN_BANNER_LIST],
		queryFn: async () => getBannerList('main', 'mainBannerListResponseDtoList'),
		...queryOptions,
	})
}
