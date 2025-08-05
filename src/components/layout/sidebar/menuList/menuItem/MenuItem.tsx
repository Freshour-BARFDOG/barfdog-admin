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
		const itemHref = item.href.replace(/\/$/, '');
		const currentPath = pathname.replace(/\/$/, '');

		// 루트 경로('/')
		if (itemHref === '') {
			return currentPath === '/';
		}

		// 정확히 일치
		if (currentPath === itemHref) return true;

		// 상세 페이지 조건:
		// - currentPath가 itemHref 하위 경로 시작
		// - 마지막 segment가 'create' 등의 고정 키워드가 아님
		const segments = currentPath.split('/');
		const lastSegment = segments[segments.length - 1];

		const excludedKeywords = ['create', 'release', 'usage', 'best-review'];
		const exceptionPaths = ['banners', 'community', 'alliance'];
		const isExceptionPath = exceptionPaths.some(path => itemHref.includes(path));

			// /alliance/coupon/create → 명시적 예외 처리
		if (currentPath === '/alliance/coupon/create' && itemHref === '/alliance/coupon') {
			return false;
		}

		if (
			currentPath.startsWith(`${itemHref}/`) &&
			(!isExceptionPath ? !excludedKeywords.includes(lastSegment) : true)
		) {
			return true;
		}

		return false;
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