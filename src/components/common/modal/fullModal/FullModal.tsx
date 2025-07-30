import * as styles from "./FullModal.css";
import { ReactNode } from "react";
import { X } from "lucide-react";
import ModalBackground from "@/components/common/modal/modalBackground/ModalBackground";
import Card from "@/components/common/card/Card";
import Text from "@/components/common/text/Text";

interface FullModalProps {
  isVisible: boolean;
  handleClose?: () => void;
  handleGoBack?: () => void;
  children: ReactNode;
  className?: string;
  title?: string;
  padding?: 'none' | 16 | 20;
  width?: number;
}

export default function FullModal({
  isVisible,
  handleClose,
  handleGoBack,
  children,
  className,
  title,
  padding = 'none',
  width,
}: FullModalProps) {
  return (
    isVisible && (
      <ModalBackground
        isVisible={isVisible}
        onClose={handleClose || handleGoBack}
        closeOnBackgroundClick={false}
      >
        <Card shadow='none' style={{ width: width }} className={`${styles.modalContainer} ${className || ""}`}>
          {title &&
            <div className={styles.modalHeader}>
              <Text type='title3' color='white'>{title}</Text>
              <button onClick={handleClose}><X color='white' /></button>
            </div>
          }
          <div className={styles.modalContent({ padding })}>
            {children}
          </div>
        </Card>
      </ModalBackground>
    )
  );
};