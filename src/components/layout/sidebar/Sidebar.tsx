import * as styles from "./Sidebar.css";
import { useDeviceState } from "@/hooks/useDeviceState";
import { motion } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import MenuList from "@/components/layout/sidebar/menuList/MenuList";

export default function Sidebar() {
  const { isMobileWidth: isMobile } = useDeviceState();
  const { sidebarCollapsed, sidebarOpenOnMobile } = useUIStore();

  return (
    <motion.aside
      animate={
        isMobile ? (sidebarOpenOnMobile ? { x: 0 } : { x: "-100%" }) : { x: 0 }
      }
      initial={false}
      transition={{ type: "tween", duration: 0.3 }}
      className={`${styles.sidebar} ${
        sidebarCollapsed && !isMobile
          ? styles.sidebarCollapsed
          : styles.sidebarExpanded
      }`}
      style={{
        transform: isMobile
          ? sidebarOpenOnMobile
            ? "translateX(0)"
            : "translateX(-100%)"
          : "translateX(0)",
        transition: "transform 0.3s ease",
        zIndex: 1000,
        marginTop: 56,
      }}
    >
      <MenuList />
    </motion.aside>
  );
}
