import * as styles from './Header.css';
import Image from "next/image";
import Logo from '/public/images/logo/logo-default.png';
import { Menu, X } from "lucide-react";
import { useDeviceState } from "@/hooks/useDeviceState";
import { useUIStore } from "@/store/uiStore";
import Text from "@/components/common/text/Text";

export default function Header() {
	const { isMobileWidth: isMobile } = useDeviceState();
	const {
		openSidebarMobile,
		toggleSidebarCollapsed,
		closeSidebarMobile, sidebarOpenOnMobile
	} = useUIStore();

	return (
		<header className={styles.header}>
			{!isMobile &&
				<div className={styles.logo}>
					<Image src={Logo} alt='logo' width={180} height={32} />
				</div>
			}
			<div className={styles.headerRight({ isMobile })}>
				<button
					className={styles.menuButton}
					onClick={() => {
						if (isMobile) {
							if (!sidebarOpenOnMobile) {
								openSidebarMobile();
							} else {
								closeSidebarMobile();
							}
						} else {
							toggleSidebarCollapsed();
						}
					}}
				>
					{!sidebarOpenOnMobile
						? <Menu color='black' />
						: <X color='black' />
					}
				</button>
				{isMobile &&
	      <div className={styles.logo}>
	        <Image src={Logo} alt='logo' width={180} height={32} />
	      </div>
				}
				<Text type='headline2'>관리자</Text>
			</div>
		</header>
	);
}
