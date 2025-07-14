import { useQuery } from "@tanstack/react-query";
import { UseSuspenseQueryCustomOptions } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";
import { MainBannerFormValues } from "@/types/banners";
import { getBannerDetail } from "@/api/banners/banners";

export function useGetMainBannerDetail(bannerId: number, queryOptions?: UseSuspenseQueryCustomOptions<MainBannerFormValues>) {
	return useQuery<MainBannerFormValues>({
		queryKey: [queryKeys.BANNERS.BASE, queryKeys.BANNERS.GET_MAIN_BANNER_DETAIL, bannerId],
		queryFn: async () => await getBannerDetail('main', bannerId),
		...queryOptions,
	})
}
