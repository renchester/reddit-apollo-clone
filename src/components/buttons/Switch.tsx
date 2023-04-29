import styles from './Switch.module.scss';
import { motion } from 'framer-motion';

type SwitchProps = {
  id: string;
  isOn: boolean;
  handler?: (e?: any) => void;
  ariaLabel: string;
};

function Switch(props: SwitchProps) {
  const { id, isOn, ariaLabel, handler } = props;

  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  };

  return (
    <div className={styles.switch} data-status={isOn}>
      <label htmlFor={id} aria-hidden className={styles.switch__tablet}>
        <input
          id={id}
          type="checkbox"
          aria-label={ariaLabel}
          onChange={handler}
          className={styles.switch__input}
          {...{ checked: isOn }}
        />
        <motion.div
          layout
          transition={spring}
          aria-hidden
          className={styles.switch__marker}
        />
      </label>
    </div>
  );
}
export default Switch;
