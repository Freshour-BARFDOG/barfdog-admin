import { AnimatePresence, motion } from "framer-motion";
import ModalBackground from "@/components/common/modal/modalBackground/ModalBackground";
import DetailTable from "@/components/common/detailTable/DetailTable";
import { orderDetailModalContainer } from "./Modal.css";
import { TableItem } from "@/types/common";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import CloseIcon from "public/images/icons/close_small.svg";
import { commonWrapper } from "@/styles/common.css";

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
          <div className={commonWrapper({ justify: "end" })}>
            <SvgIcon src={CloseIcon} size={30} onClick={onClose} />
          </div>
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
