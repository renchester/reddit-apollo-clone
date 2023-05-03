import styles from './Snackbar.module.scss';
import { Alert } from '@/types/types';
import { motion } from 'framer-motion';

type SnackbarProps = {
  alert: Alert;
};

function Snackbar(props: SnackbarProps) {
  const { alert } = props;
  const { message, submessage, status } = alert;

  const getIconText = () => {
    let iconText = '';

    switch (status) {
      case 'error':
        iconText = 'error';
        break;

      case 'neutral':
        iconText = 'info';
        break;

      case 'success':
        iconText = 'check_circle';
        break;

      default:
        iconText = 'check';
        break;
    }

    return iconText;
  };

  return (
    <motion.div
      role="alert"
      className={styles.snackbar}
      data-status={status}
      initial={{ x: '-50%', y: '200%', opacity: 0 }}
      animate={{ y: '0%', opacity: 1 }}
      exit={{ y: '200%', opacity: 0 }}
    >
      <i className={`material-symbols-outlined ${styles.icon}`}>
        {getIconText()}
      </i>

      <div className={styles.messageWrapper}>
        <p className={styles.message}>{message}</p>
        {submessage && <p className={styles.submessage}>{submessage}</p>}
      </div>
    </motion.div>
  );
}
export default Snackbar;
