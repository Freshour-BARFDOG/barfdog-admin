import { easeInOut } from "framer-motion";

export const MOTION = {
  EXPAND_FROM_TOP: {
    hidden: {
      height: 0,
      opacity: 0,
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.15,
        ease: easeInOut,
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.15,
        ease: easeInOut,
      },
    },
  },
};
