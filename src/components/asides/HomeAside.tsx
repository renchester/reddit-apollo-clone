import styles from './Aside.module.scss';

function HomeAside() {
  return (
    <aside className={styles.aside__main}>
      <h2 className={styles.aside__heading}>Home</h2>
      <p className={styles.aside__description}>
        Your personal Reddit frontpage. Come here to check in with your favorite
        communities.
      </p>
    </aside>
  );
}

export default HomeAside;
