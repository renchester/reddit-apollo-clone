import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import styles from './Overlay.module.scss';

type OverlayProps = {
  children: ReactNode;
  hideChildren: () => void;
};

function Overlay(props: OverlayProps) {
  const { children, hideChildren } = props;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only run event when actual overlay is clicked
    if (e.target === e.currentTarget) {
      hideChildren();
    }
  };

  return (
    <motion.div
      className={styles.overlay}
      onClickCapture={handleClick}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
export default Overlay;
