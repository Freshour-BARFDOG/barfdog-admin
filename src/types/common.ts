import { ComponentType, ReactNode, SVGProps } from "react";

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
	render?: (value: T) => ReactNode;
}

interface SelectOption<T extends string | number | boolean> {
	label: string;
	value: T;
};

export type {
	MenuItem,
	TableColumn,
	SelectOption,
}