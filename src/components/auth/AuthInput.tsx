import styles from './AuthInput.module.scss';
import { motion } from 'framer-motion';

type AuthInputProps = {
  id: string;
  type: string;
  name: string;
  label: string;
  value: string;
  isValid?: boolean;
  placeholder?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  minLength?: number;
  maxLength?: number;
  isRequired?: boolean;
};

function AuthInput(props: AuthInputProps) {
  const {
    id,
    type,
    name,
    label,
    value,
    placeholder,
    handleChange,
    isValid,
    errorMessage,
    minLength,
    maxLength,
    isRequired,
  } = props;

  return (
    <motion.div
      className={`${styles.wrapper} ${
        value.length > 0 ? styles.wrapper__filled : styles.wrapper__empty
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        className={styles.input}
        onChange={handleChange}
        {...(placeholder ? { placeholder } : '')}
        {...(minLength !== undefined ? { minLength } : '')}
        {...(maxLength !== undefined ? { maxLength } : '')}
        {...{ required: isRequired || false }}
      />
      {value.length > 0 && isValid !== undefined ? (
        isValid ? (
          <div className={styles.validation} aria-label={`${label} is valid`}>
            <i
              className={`material-symbols-outlined ${styles.validation__icon} ${styles.validation__validIcon}`}
              aria-hidden
            >
              check
            </i>
          </div>
        ) : (
          <div className={styles.validation} aria-label={`${label} is invalid`}>
            <i
              className={`material-symbols-outlined ${styles.validation__icon} ${styles.validation__invalidIcon}`}
              aria-hidden
            >
              close
            </i>
          </div>
        )
      ) : (
        ''
      )}

      {errorMessage && !isValid && value.length > 0 && (
        <p className={styles.error__message}>{errorMessage}</p>
      )}
    </motion.div>
  );
}
export default AuthInput;
