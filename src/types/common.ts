import { ComponentType, SVGProps } from "react";

interface MenuItem {
	key: string;
	label: string;
	href?: string;
	icon?: ComponentType<SVGProps<SVGSVGElement>>;
	children?: MenuItem[];
}

export type {
	MenuItem,
}