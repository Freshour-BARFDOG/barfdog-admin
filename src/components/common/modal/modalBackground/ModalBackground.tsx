import * as styles from "./ModalBackground.css";
import ModalPortal from "./ModalPortal";
import { ReactNode, useEffect } from "react";
import modalScroll from "@/utils/modalScroll";

interface ModalBackgroundProps {
  children: ReactNode;
  isVisible: boolean;
  closeOnBackgroundClick?: boolean;
  isDimmed?: boolean;
  onClose?: () => void;
}
export default function ModalBackground({
  children,
  isVisible,
  closeOnBackgroundClick = true,
  isDimmed = true,
  onClose,
}: ModalBackgroundProps) {
  const { preventScroll, allowScroll } = modalScroll();

  useEffect(() => {
    if (isVisible) {
      const prevScrollY = preventScroll();
      return () => {
        allowScroll(prevScrollY);
      };
    }
  }, [isVisible]);

  if (!isVisible) return null;
  return (
    <>
      {isVisible && (
        <ModalPortal>
          <div
            className={styles.modalBackground({isDimmed})}
            onClick={closeOnBackgroundClick ? onClose : undefined}
          >
            {children}
          </div>
        </ModalPortal>
      )}
    </>
  );
}
