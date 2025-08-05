import { QueryClient } from "@tanstack/react-query";
import { getGeneralProductDetail } from "../products";
import { queryKeys } from "@/constants/queryKeys";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetGeneralProductDetail(
  itemId: number,
  queryClient: QueryClient
) {
  const ssrAxios = await createSSRRequest();
  await queryClient.prefetchQuery({
    queryKey: [
      queryKeys.PRODUCTS.BASE,
      queryKeys.PRODUCTS.GET_GENERAL_PRODUCT_DETAIL,
      itemId,
    ],
    queryFn: () => getGeneralProductDetail(Number(itemId), ssrAxios),
  });
}
