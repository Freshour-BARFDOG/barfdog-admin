import * as styles from './MenuList.css';
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useDeviceState } from "@/hooks/useDeviceState";
import { MenuItem as MenuItemType } from "@/types/common";
import { MENU_ITEMS } from "@/constants/menu";
import { useUIStore } from "@/store/uiStore";
import MenuItem from "@/components/layout/sidebar/menuList/menuItem/MenuItem";

function findParentKeys(menuList: MenuItemType[], targetPath: string, path: string[] = []): string[] | null {
	for (const item of menuList) {
		const currentPath = [...path, item.key];
		if (item.href === targetPath) {
			return currentPath.slice(0, -1); // 자기 자신은 제외하고 부모만
		}
		if (item.children) {
			const result = findParentKeys(item.children, targetPath, currentPath);
			if (result) return result;
		}
	}
	return null;
}

const MenuList = () => {
	const pathname = usePathname();
	const initialOpenKeys = findParentKeys(MENU_ITEMS, pathname) ?? [];

	const { isMobileWidth: isMobile } = useDeviceState();
	const { closeSidebarMobile, sidebarCollapsed, toggleSidebarCollapsed } = useUIStore();

	const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => {
		const initialState: Record<string, boolean> = {};
		initialOpenKeys.forEach(key => {
			initialState[key] = true;
		});
		return initialState;
	});

	const toggleSubmenu = (key: string) => {
		setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	return (
		<ul
			onMouseOver={sidebarCollapsed ? toggleSidebarCollapsed : undefined}
			className={styles.menuList}
		>
			{MENU_ITEMS.map(item => (
				<MenuItem
					key={item.key}
					item={item}
					openMenus={openMenus}
					toggleSubmenu={toggleSubmenu}
					sidebarCollapsed={sidebarCollapsed}
					isMobile={isMobile}
					closeSidebarMobile={closeSidebarMobile}
					pathname={pathname}
				/>
			))}
		</ul>
	);
};

export default MenuList;