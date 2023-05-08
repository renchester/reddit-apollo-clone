import { useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import styles from './Overlay.module.scss';

type OverlayProps = {
  children: ReactNode;
  hideChildren: (e?: any) => void;
};

function Overlay(props: OverlayProps) {
  const { children, hideChildren } = props;

  useEffect(() => {
    function escKeyListener(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        hideChildren();
      }
    }

    window.addEventListener('keydown', escKeyListener);

    return () => window.removeEventListener('keydown', escKeyListener);
  }, [hideChildren]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

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
