import { useState } from 'react';
import styles from './ImageViewer.module.scss';
import Overlay from '../Overlay';
import { useSwipeable } from 'react-swipeable';
import { motion } from 'framer-motion';

type ImageViewerProps = {
  imageSrc: string;
};

function ImageViewer(props: ImageViewerProps) {
  const { imageSrc } = props;

  const [isFullscreen, setFullscreenStatus] = useState(false);

  const showFullscreen = (e?: React.MouseEvent<HTMLElement>) => {
    e?.preventDefault();
    setFullscreenStatus(true);
  };

  const collapseFullscreen = (e?: React.MouseEvent<HTMLElement>) => {
    e?.preventDefault();
    setFullscreenStatus(false);
  };

  const swipeHandlers = useSwipeable({
    onSwipedDown: () => setFullscreenStatus(false),
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  return (
    <motion.div className={styles.wrapper} exit={{ opacity: 0 }}>
      <img
        src={imageSrc}
        alt=""
        className={styles.img}
        loading="lazy"
        onClick={showFullscreen}
      />

      {isFullscreen && (
        <Overlay hideChildren={collapseFullscreen}>
          <button
            type="button"
            className={styles.btn}
            onClick={collapseFullscreen}
          >
            <i
              className={`material-symbols-outlined ${styles.btn__icon}`}
              aria-hidden
            >
              close
            </i>
          </button>
          <img
            src={imageSrc}
            alt=""
            className={styles.img__fullscreen}
            onKeyDown={(e) => {
              if (e.key === 'Escape') collapseFullscreen();
            }}
            {...swipeHandlers}
          />
        </Overlay>
      )}
    </motion.div>
  );
}
export default ImageViewer;
