import * as styles from "./Header.css";
import Image from "next/image";
import Logo from "/public/images/logo/logo-default.png";
import { LogOut, Menu, X } from "lucide-react";
import { useDeviceState } from "@/hooks/useDeviceState";
import { useUIStore } from "@/store/uiStore";
import Text from "@/components/common/text/Text";
import DividerVertical from "@/components/common/dividerVertical/DividerVertical";
import { useGetUserData } from "@/api/auth/query/useGetUserData";
import { deleteCookie } from "@/utils/auth/cookie";
import { AUTH_CONFIG } from "@/constants/auth";
import { useLogout } from "@/api/auth/mutations/useLogout";

export default function Header() {
  const { isMobileWidth: isMobile } = useDeviceState();

  const {
    openSidebarMobile,
    toggleSidebarCollapsed,
    closeSidebarMobile,
    sidebarOpenOnMobile,
  } = useUIStore();

  const { data } = useGetUserData();

  // 현재 리뉴얼 서버에만 작동중 (https://renewal-dev.barfdogserver.com)
  // const { mutate: logout } = useLogout();

  const handleLogout = () => {
    const confirmed = window.confirm(`로그아웃 하시겠습니까?`);
    if (!confirmed) return;

    deleteCookie(AUTH_CONFIG.LOGIN_COOKIE);
    deleteCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
    deleteCookie(AUTH_CONFIG.REFRESH_TOKEN_COOKIE);
    window.location.pathname = "/login";

    // logout(undefined, {
    //   onSuccess: () => {
    //     deleteCookie(AUTH_CONFIG.LOGIN_COOKIE);
    //     deleteCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
    //     deleteCookie(AUTH_CONFIG.REFRESH_TOKEN_COOKIE);
    //     window.location.pathname = '/login';
    //   },
    //   onError: (error) => {
    //     console.error("Logout error", error);
    //   },
    // });
  };

  return (
    <header className={styles.header}>
      {!isMobile && (
        <div className={styles.logo}>
          <Image src={Logo} alt="logo" width={180} height={32} />
        </div>
      )}
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
          {!sidebarOpenOnMobile ? <Menu color="black" /> : <X color="black" />}
        </button>
        {isMobile && (
          <div className={styles.logo}>
            <Image src={Logo} alt="logo" width={180} height={32} />
          </div>
        )}
        {data && (
          <div className={styles.username}>
            <Text type="headline2">{data.name}</Text>
            <DividerVertical thickness={1} color="gray200" />
            <button onClick={handleLogout} className={styles.logout}>
              <LogOut size={20} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
