import styles from './Loading.module.scss';

type LoadingProps = {
  message: string;
};

function Loading(props: LoadingProps) {
  const { message } = props;

  return (
    <div
      role="progressbar"
      aria-label="Loading spinner"
      aria-busy
      className={styles.container}
    >
      <div className={styles.spinner}>
        <div className={styles.spinner__div} aria-hidden></div>
        <div className={styles.spinner__div} aria-hidden></div>
        <div className={styles.spinner__div} aria-hidden></div>
        <div className={styles.spinner__div} aria-hidden></div>
        <div className={styles.spinner__div} aria-hidden></div>
        <div className={styles.spinner__div} aria-hidden></div>
        <div className={styles.spinner__div} aria-hidden></div>
        <div className={styles.spinner__div} aria-hidden></div>
        <div className={styles.spinner__div} aria-hidden></div>
        <div className={styles.spinner__div} aria-hidden></div>
        <div className={styles.spinner__div} aria-hidden></div>
        <div className={styles.spinner__div} aria-hidden></div>
      </div>
      {message && <span className={styles.message}>{message}</span>}
    </div>
  );
}

export default Loading;
