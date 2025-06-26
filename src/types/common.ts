import { ComponentType, ReactNode, SVGProps } from "react";
import {QueryKey, UseMutationOptions, UseQueryOptions, UseSuspenseQueryOptions} from "@tanstack/react-query";

interface MenuItem {
	key: string;
	label: string;
	href?: string;
	icon?: ComponentType<SVGProps<SVGSVGElement>>;
	children?: MenuItem[];
}

interface TableColumn<T> {
	key: keyof T | string;
	header: string;
	width?: string | number;
	render?: (value: T, index: number) => ReactNode;
}

interface SelectOption<T extends string | number | boolean> {
	label: string;
	value: T;
};

interface SearchFilterItem {
	label: string;
	children: ReactNode;
	align?: 'start' | 'center';
}

interface Page {
	size: number;
	totalElements: number;
	totalPages: number;
	number: number;
}

type UseMutationCustomOptions<TData = unknown, TVariables = unknown, TError = unknown> = Omit<
	UseMutationOptions<TData, TError, TVariables, unknown>,
	"mutationFn"
	>;

type UseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
	UseQueryOptions<TQueryFnData, TypeError, TData, QueryKey>,
	"queryKey"
	> & {
	keepPreviousData?: boolean;
};

type UseSuspenseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
	UseSuspenseQueryOptions<TQueryFnData, TypeError, TData, QueryKey>,
	"queryKey"
	> & {
	keepPreviousData?: boolean;
};

export type {
	MenuItem,
	TableColumn,
	SelectOption,
	SearchFilterItem,
	Page,
	UseMutationCustomOptions,
	UseQueryCustomOptions,
	UseSuspenseQueryCustomOptions,
}