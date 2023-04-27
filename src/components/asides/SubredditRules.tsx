import styles from './Aside.module.scss';

function SubredditRules() {
  return (
    <aside className={styles.aside__main}>
      <h3>r/All Rules</h3>
      <ul>
        <li>Don&apos;t do this</li>
        <li>Don&apos;t do that</li>
        <li>Don&apos;t do what</li>
        <li>Don&apos;t do this</li>
      </ul>
    </aside>
  );
}
export default SubredditRules;
