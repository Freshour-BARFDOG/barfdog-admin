import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { UserDataResponse } from "@/types/auth";
import { getUserData } from "../auth";

export function useGetUserData(queryOptions?: UseQueryCustomOptions<UserDataResponse>) {
	return useQuery<UserDataResponse>({
		queryKey: [ queryKeys.AUTH.BASE, queryKeys.AUTH.GET_USER_DATA],
		queryFn: () => getUserData(),
		keepPreviousData: true,
		...queryOptions,
	});
}