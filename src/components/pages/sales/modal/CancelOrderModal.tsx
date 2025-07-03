import { AnimatePresence, motion } from "framer-motion";
import ModalBackground from "@/components/common/modal/modalBackground/ModalBackground";
import InputField from "@/components/common/inputField/InputField";
import Text from "@/components/common/text/Text";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import {
  cancelOrderModalContainer,
  orderDetailModalContainer,
} from "./Modal.css";
import { commonWrapper } from "@/styles/common.css";
import Button from "@/components/common/button/Button";

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
          className={cancelOrderModalContainer}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <Text type="title3">판매취소 하시겠습니까?</Text>
          <div
            className={commonWrapper({
              direction: "col",
              gap: 20,
            })}
          >
            <InputField
              label="판매취소 사유"
              placeholder="사유를 입력해주세요"
              value={reason}
              onChange={(e) => onChangeReason(e.target.value)}
              clearButton
              type="text"
            />
            <div className={commonWrapper({ gap: 12 })}>
              <Button variant="outline" onClick={onClose}>
                닫기
              </Button>
              <Button onClick={onConfirm}>판매취소</Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </ModalBackground>
  );
}
