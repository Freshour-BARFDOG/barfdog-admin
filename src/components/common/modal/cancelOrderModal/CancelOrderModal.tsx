import { AnimatePresence, motion } from "framer-motion";
import ModalBackground from "@/components/common/modal/modalBackground/ModalBackground";
import { modalStyle } from "../addressModal/AddressModal.css";
import InputField from "../../inputField/InputField";
import ButtonDocked from "../../buttonDocked/ButtonDocked";
import Text from "../../text/Text";

interface CancelOrderModalProps {
  isOpen: boolean;
  reason: string;
  selectedCount: number;
  onChangeReason: (value: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export default function CancelOrderModal({
  isOpen,
  reason,
  selectedCount,
  onChangeReason,
  onConfirm,
  onClose,
}: CancelOrderModalProps) {
  if (!isOpen) return null;

  return (
    <ModalBackground isVisible={isOpen} onClose={onClose} isDimmed>
      <AnimatePresence>
        <motion.div
          className={modalStyle}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <Text type="title3">{selectedCount}개를 판매취소 하시겠습니까?</Text>
          <div style={{ padding: 24, width: 360 }}>
            <InputField
              label="판매취소 사유"
              placeholder="사유를 입력해주세요"
              value={reason}
              onChange={(e) => onChangeReason(e.target.value)}
              clearButton
            />
            <ButtonDocked
              type="dual-button"
              primaryButtonLabel="판매 취소"
              secondaryButtonLabel="닫기"
              onPrimaryClick={onConfirm}
              onSecondaryClick={onClose}
              primaryButtonSize="lg"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </ModalBackground>
  );
}
