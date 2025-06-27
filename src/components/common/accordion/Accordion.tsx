import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import * as styles from './Accordion.css';
import AccordionIcon from '/public/images/icons/chevron-left-blue.svg';
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

interface AccordionProps {
  title: string | ReactNode;
  children?: ReactNode;
  open?: boolean;
  showArrow?: boolean;
  buttonClassName?: string;
  contentClassName?: string;
  onToggle?: (isOpen: boolean) => void;
}

const Accordion = ({
  title,
  children,
  open = false,
  showArrow = true,
  buttonClassName = '',
  contentClassName = '',
  onToggle,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(open);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    onToggle?.(!isOpen);
  }

  return (
    <>
      <button onClick={toggleAccordion} className={`${styles.accordionButton({ noChildren: !children, isOpen })} ${buttonClassName}`}>
        {title}
        {showArrow &&
          <SvgIcon src={AccordionIcon} size={24} className={styles.accordionIcon({ isOpen: isOpen })}/>
        }
      </button>
      {children &&
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={styles.accordionMotionDiv}
        >
          <div className={`${styles.accordionContent} ${contentClassName}`}>
            {children}
          </div>
        </motion.div>
      }
    </>
  );
};

export default Accordion;