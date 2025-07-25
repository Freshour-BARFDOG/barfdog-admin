import * as styles from "./AlertModal.css";
import { ReactNode, useCallback, useMemo } from "react";
import ModalBackground from "../modalBackground/ModalBackground";
import Button from "../../button/Button";
import Text from "@/components/common/text/Text";

interface ModalProps {
  title?: string;
  content: string | ReactNode;
  buttonType?: "default" | "text";
  confirmText?: string;
  cancelText?: string;
  buttonPosition?: "center" | "right";
  onConfirm?: () => void;
  onCancel?: () => void;
  isOpen: boolean;
  onClose: () => void;
  isConfirmDisabled?: boolean;
}

export default function AlertModal({
  title,
  content,
  buttonType = "default",
  confirmText,
  cancelText,
  buttonPosition = "center",
  onConfirm,
  onCancel,
  isOpen,
  onClose,
  isConfirmDisabled,
}: ModalProps) {
  const handleConfirm = useCallback(() => {
    onConfirm?.();
    onClose();
  }, [onConfirm, onClose]);

  const handleCancel = useCallback(() => {
    onCancel?.();
    onClose();
  }, [onCancel, onClose]);

  const { cancelType, cancelVariant, confirmType, confirmVariant } =
    useMemo(() => {
      if (buttonType === "text") {
        return {
          cancelType: "assistive" as const,
          cancelVariant: "text" as const,
          confirmType: "primary" as const,
          confirmVariant: "text" as const,
        };
      }
      return {
        cancelType: "assistive" as const,
        cancelVariant: "outline" as const,
        confirmType: "primary" as const,
        confirmVariant: "solid" as const,
      };
    }, [buttonType]);

  if (!isOpen) return null;

  return (
    <ModalBackground isVisible={isOpen} onClose={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalContentWrapper}>
          {title && <Text type="title4">{title}</Text>}
          {typeof content === 'string'
            ? <Text type="body2" align='center' className={styles.modalContent}>{content}</Text>
            : content
          }
        </div>
        <div className={styles.modalButtonWrapper}>
          {cancelText && (
            <Button
              type={cancelType}
              variant={cancelVariant}
              onClick={handleCancel}
              fullWidth={buttonPosition === "center"}
            >
              {cancelText}
            </Button>
          )}
          {confirmText && (
            <Button
              type={confirmType}
              variant={confirmVariant}
              onClick={handleConfirm}
              fullWidth={buttonPosition === "center"}
              disabled={isConfirmDisabled}
            >
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </ModalBackground>
  );
}
