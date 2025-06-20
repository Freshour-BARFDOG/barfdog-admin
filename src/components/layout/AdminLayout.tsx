'use client';
import * as styles from './AdminLayout.css';
import { useDeviceState } from "@/hooks/useDeviceState";
import { useUIStore } from "@/store/uiStore";
import { motion } from 'framer-motion';
import { ReactNode } from "react";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import Header from "@/components/layout/header/Header";

export function AdminLayout({ children }: { children: ReactNode }) {
	const { isMobileWidth: isMobile } = useDeviceState();
	const {
		sidebarCollapsed,
		sidebarOpenOnMobile,
		closeSidebarMobile,
	} = useUIStore();

	return (
		<>
			{/* 오버레이 (모바일 전용) */}
			{isMobile && sidebarOpenOnMobile && (
				<div className={styles.sidebarMobileOverlay} onClick={closeSidebarMobile} />
			)}
			{/* 사이드바 */}
			<Sidebar />
			{/* 헤더 */}
			<Header />
			<motion.main
				className={styles.mainContent}
				animate={{
					marginLeft: isMobile
						? 0
						: sidebarCollapsed
							? 64
							: 240,
				}}
				transition={{ type: 'tween', duration: 0.3 }}
			>
				{children}
			</motion.main>
		</>
	);
}
