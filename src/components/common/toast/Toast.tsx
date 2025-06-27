"use client";
import React, { useEffect, useState } from "react";
import * as styles from "./Toast.css";
import { ellipsis } from "@/styles/common.css";
import CloseButton from "/public/images/icons/close.svg";
import { motion, AnimatePresence } from "framer-motion";
import { useToastStore } from "@/store/useToastStore";
import { toastPosition } from "./Toast.css";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Text from "@/components/common/text/Text";

interface ToastProps {
  id: string;
  message: string;
  onClose: () => void;
  duration?: number;
  closeButton?: boolean;
}

const ToastItem = ({
  id,
  message,
  onClose,
  duration = 10000,
  closeButton = false,
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{
        opacity: 0,
        x: 0,
        transition: { duration: 1, ease: "easeInOut" },
      }}
      className={`${styles.toast}`}
    >
      <Text
        type="label3"
        color="white"
        className={ellipsis({ lineSize: "line2" })}
      >
        {message}
      </Text>
      {closeButton && (
        <button onClick={onClose}>
          <SvgIcon src={CloseButton} />
        </button>
      )}
    </motion.div>
  );
};

const Toast = () => {
  const { currentToast, removeToast } = useToastStore();

  const [position, setPosition] = useState("top");

  useEffect(() => {
    if (currentToast && currentToast.position) {
      setPosition(currentToast.position);
    }
  }, [currentToast]);

  return (
    <div
      className={`
      ${styles.toastContainer} 
      ${toastPosition[position as 'bottom' | 'top']}`}
    >
      <AnimatePresence mode="wait">
        {currentToast && (
          <ToastItem
            key={currentToast.id}
            id={currentToast.id}
            message={currentToast.message}
            duration={currentToast.duration}
            onClose={removeToast}
            closeButton={currentToast.closeButton}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
