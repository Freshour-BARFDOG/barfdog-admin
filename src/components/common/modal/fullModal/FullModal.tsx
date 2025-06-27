import * as styles from "./FullModal.css";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModalBackground from "@/components/common/modal/modalBackground/ModalBackground";

interface FullModalProps {
  isVisible: boolean;
  handleClose?: () => void;
  handleGoBack?: () => void;
  children: ReactNode;
  className?: string;
}

export default function FullModal({
  isVisible,
  handleClose,
  handleGoBack,
  children,
  className,
}: FullModalProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <ModalBackground
          isVisible={isVisible}
          onClose={handleClose || handleGoBack}
          closeOnBackgroundClick={false}
          isDimmed={false}
        >
          <motion.div
            className={`${styles.modalContainer} ${className || ""}`}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className={styles.modalContent}>{children}</div>
          </motion.div>
        </ModalBackground>
      )}
    </AnimatePresence>
  );
};