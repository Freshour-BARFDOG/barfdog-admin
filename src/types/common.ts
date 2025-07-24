import { ComponentType, ReactNode, SVGProps } from "react";
import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { AREA, STATUS } from "@/constants/common";

interface MenuItem {
  key: string;
  label: string;
  href?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  children?: MenuItem[];
}

interface TableColumn<T> {
  key: keyof T | string;
  header: ReactNode | string;
  width?: string | number;
  backgroundColor?: "gray0" | "gray50";
  render?: (value: T, index: number) => ReactNode;
}

interface SelectOption<T extends string | number | boolean | null> {
  label: string;
  value: T;
}

interface SearchFilterItem {
  label: string | ReactNode;
  children: ReactNode;
  align?: "start" | "center";
}

interface infoItem {
  label: string;
  value: string | ReactNode;
  align?: "start" | "center";
}

interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

interface PagePrams {
  page?: number;
  size?: number;
}
type DiscountUnitType = "FLAT_RATE" | "FIXED_RATE";

type UseMutationCustomOptions<
  TData = unknown,
  TVariables = unknown,
  TError = unknown
> = Omit<UseMutationOptions<TData, TError, TVariables, unknown>, "mutationFn">;

type UseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, TypeError, TData, QueryKey>,
  "queryKey"
> & {
  keepPreviousData?: boolean;
};

type UseSuspenseQueryCustomOptions<
  TQueryFnData = unknown,
  TData = TQueryFnData
> = Omit<
  UseSuspenseQueryOptions<TQueryFnData, TypeError, TData, QueryKey>,
  "queryKey"
> & {
  keepPreviousData?: boolean;
};

type AreaType = keyof typeof AREA;

type GradeType =
  | "브론즈"
  | "실버"
  | "골드"
  | "플래티넘"
  | "다이아몬드"
  | "더 바프";

interface ImageFile {
  id?: number;
  filename: string;
  url: string;
}

type StatusType = keyof typeof STATUS;

type DogGender = "MALE" | "FEMALE";

interface TableItem {
  label: string;
  value: React.ReactNode;
  /** true 면 해당 페어(dt+dd)를 전체 폭으로 차지 */
  fullWidth?: boolean;
  align?: "center" | "start";
}
export type {
  MenuItem,
  TableColumn,
  SelectOption,
  SearchFilterItem,
  infoItem,
  Page,
  UseMutationCustomOptions,
  UseQueryCustomOptions,
  UseSuspenseQueryCustomOptions,
  AreaType,
  GradeType,
  PagePrams,
  DiscountUnitType,
  ImageFile,
  StatusType,
  DogGender,
  TableItem,
};
