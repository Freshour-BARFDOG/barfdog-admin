import { ComponentType, SVGProps } from "react";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

interface MenuIconProps {
	active: boolean;
	icon?: ComponentType<SVGProps<SVGSVGElement>>;
	size?: number;
}

const MenuIcon = ({ active, icon, size }: MenuIconProps) => {
	if(!icon) return null;
	return (
		<SvgIcon src={icon} size={size} color={active ? 'red' : 'gray900'} />
	);
};

export default MenuIcon;