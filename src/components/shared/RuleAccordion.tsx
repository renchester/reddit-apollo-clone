import { useState } from 'react';
import styles from './RuleAccordion.module.scss';

type RuleAccordionProps = {
  index: number;
  title: string;
  details: string;
};

function RuleAccordion(props: RuleAccordionProps) {
  const { index, title, details } = props;

  const [isExpanded, setExpandedState] = useState(false);

  const toggleRule = () => setExpandedState((prev) => !prev);

  return (
    <li className={styles.rule}>
      <span className={styles.rule__index}>{index}.</span>
      <p className={styles.rule__title}>{title}</p>
      <button
        type="button"
        aria-label="Show rule details"
        onClick={toggleRule}
        className={styles.rule__btnExpand}
      >
        <span className={`material-symbols-outlined`}>
          {isExpanded ? 'expand_less' : 'expand_more'}
        </span>
      </button>
      {isExpanded && (
        <div className={styles.rule__expanded}>
          <p className={styles.rule__details}>{details}</p>
        </div>
      )}
    </li>
  );
}
export default RuleAccordion;
