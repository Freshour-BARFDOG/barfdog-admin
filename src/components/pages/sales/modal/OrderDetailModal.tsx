import { AnimatePresence, motion } from "framer-motion";
import ModalBackground from "@/components/common/modal/modalBackground/ModalBackground";
import DetailTable, {
  TableItem,
} from "@/components/common/detailTable/DetailTable";
import { commonWrapper } from "@/styles/common.css";
import { orderDetailModalContainer } from "./Modal.css";

interface OrderDetailModalProps {
  isOpen: boolean;
  detailData: Array<{
    orderId: number;
    items: TableItem[];
  }>;
  onClose: () => void;
}

export default function OrderDetailModal({
  isOpen,
  detailData,
  onClose,
}: OrderDetailModalProps) {
  if (!isOpen) return null;

  return (
    <ModalBackground isVisible={isOpen} onClose={onClose} isDimmed>
      <AnimatePresence>
        <motion.div
          className={orderDetailModalContainer}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {detailData.map(({ orderId, items }, idx) => (
            <DetailTable
              key={orderId}
              items={items}
              columns={2}
              title={`주문 ${idx + 1}`}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </ModalBackground>
  );
}
