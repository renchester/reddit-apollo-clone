import styles from './Aside.module.scss';
import RuleAccordion from './RuleAccordion';

function SubredditRules() {
  return (
    <aside className={styles.aside__main}>
      <h3>r/All Rules</h3>
      <ul>
        <RuleAccordion
          index={1}
          title="Don't do this"
          details="Humor is subjective, but all posts must at least make an attempt at humor. Posts which are intentionally disruptive, inane, or nonsensical will be removed."
        />
        <RuleAccordion
          index={2}
          title="Don't do this"
          details="No personally identifying information, including anything hosted on platforms making that information public. Posts encouraging the harassment of any individual, group, community, or subreddit will be removed and may result in a ban. If necessary, a report will be made to the site administration. In accordance with Reddit's policies, there is zero tolerance for this."
        />
        <RuleAccordion
          index={3}
          title="Make sure to do this"
          details="Anything which involves or includes politics or a political figure – even if they are not the focus of the post – may not be posted here."
        />
        <RuleAccordion
          index={4}
          title="You can probably break this rule"
          details="Yes like we said do not do this"
        />
      </ul>
    </aside>
  );
}

export default SubredditRules;
