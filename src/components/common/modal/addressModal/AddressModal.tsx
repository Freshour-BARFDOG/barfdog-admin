import * as styles from './AddressModal.css';
import CloseButton from '/public/images/icons/close.svg';
import DaumPostcode, { Address } from 'react-daum-postcode';
import { AnimatePresence, motion } from "framer-motion";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import ModalBackground from "@/components/common/modal/modalBackground/ModalBackground";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAddressData: (data: Address) => void;
}

export default function AddressModal({ isOpen, onClose, onSelectAddressData }: AddressModalProps) {
  if (!isOpen) return null;

  const handleComplete = (data: Address) => {
    onSelectAddressData(data);
    onClose();
  }
  
  return (
    <ModalBackground
      isVisible={isOpen}
      onClose={onClose}
      isDimmed
    >
      <AnimatePresence>
        <motion.div
          className={styles.modalStyle}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <button onClick={onClose} className={styles.closeBtn}>
            <SvgIcon src={CloseButton} size={24} />
          </button>
          <DaumPostcode onComplete={handleComplete} />
        </motion.div>
      </AnimatePresence>
    </ModalBackground>
  );
};