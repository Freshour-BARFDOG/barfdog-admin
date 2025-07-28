import { Fragment } from 'react';
import * as styles from '../MenuList.css';
import Link from 'next/link';
import { MenuItem as MenuItemType } from "@/types/common";
import { ChevronDown, ChevronUp } from "lucide-react";
import MenuIcon from "@/components/layout/sidebar/menuList/menuItem/MenuIcon";
import MenuLabel from "@/components/layout/sidebar/menuList/menuItem/MenuLabel";

interface MenuItemProps {
	item: MenuItemType;
	openMenus: Record<string, boolean>;
	toggleSubmenu: (key: string) => void;
	sidebarCollapsed: boolean;
	isMobile: boolean;
	closeSidebarMobile: () => void;
	pathname: string;
}

const isActive = (item: MenuItemType, pathname: string): boolean => {
	if (item.href) {
		const segments = item.href.split("/").filter(Boolean); // ['', 'coupons'] → ['coupons']

		if (segments.length <= 1) {
			// ex) '/', '/coupons' 같은 목록 페이지
			return pathname === item.href;
		} else {
			// ex) '/coupons/create' 같은 하위 페이지
			return pathname.startsWith(item.href);
		}
	}

	if (item.children) {
		return item.children.some(child => isActive(child, pathname));
	}

	return false;
};

const MenuItem = ({
	item,
	openMenus,
	toggleSubmenu,
	sidebarCollapsed,
	isMobile,
	closeSidebarMobile,
	pathname,
}: MenuItemProps) => {
	const active = isActive(item, pathname);
	const isOpen = openMenus[item.key];

	const handleClick = () => {
		if (item.children) {
			toggleSubmenu(item.key);
		} else if (isMobile) {
			closeSidebarMobile();
		}
	};

	if (sidebarCollapsed) {
		return (
			<li>
				<div className={styles.menuItem({ active, sidebarCollapsed })}>
					<MenuIcon active={active} icon={item.icon} size={24} />
				</div>
			</li>
		);
	}
	return (
		<li>
			<div className={styles.menuItem({ active })} onClick={handleClick}>
				{item.href ? (
					<Link href={item.href} className={styles.menuCategory}>
						<MenuIcon active={active} icon={item.icon} />
						<MenuLabel active={active} label={item.label} />
					</Link>
				) : (
					<div className={styles.menuCategory}>
						<MenuIcon active={active} icon={item.icon} />
						<MenuLabel active={active} label={item.label} />
					</div>
				)}
				{item.children && (
					<span style={{ marginLeft: 'auto', fontSize: 12 }}>
						{isOpen ? <ChevronUp /> : <ChevronDown />}
					</span>
				)}
			</div>
			{item.children && isOpen && (
				<ul className={styles.submenu}>
					{item.children.map((child, index) => (
						<Fragment key={`${child.key}-${index}`}>
							{!child.children ? (
								<li>
									<Link href={child.href ?? '#'} className={styles.subMenuLink}>
										<MenuLabel
											active={isActive(child, pathname)}
											label={child.label}
											className={styles.menuItem({ active: isActive(child, pathname) })}
											onClick={isMobile ? closeSidebarMobile : undefined}
										/>
									</Link>
								</li>
							) : (
								<li className={styles.submenuChildren}>
									<MenuLabel active={false} label={child.label} />
									<ul className={styles.submenuChildrenList}>
										{child.children.map((sub) => {
											return (
												<Link key={sub.key} href={sub.href ?? '#'}>
													<MenuLabel
														active={isActive(sub, pathname)}
														label={sub.label}
														className={styles.menuItem({ active: isActive(sub, pathname) })}
														onClick={isMobile ? closeSidebarMobile : undefined}
													/>
												</Link>
											)
										})}
									</ul>
								</li>
							)}
						</Fragment>
					))}
				</ul>
			)}
		</li>
	);
}

export default MenuItem;