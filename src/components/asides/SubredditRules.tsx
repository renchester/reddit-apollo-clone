import styles from './Aside.module.scss';
import RuleAccordion from '../shared/RuleAccordion';

type SubredditRulesProps = {
  name: string;
};

function SubredditRules(props: SubredditRulesProps) {
  const { name } = props;
  return (
    <aside className={styles.aside__main}>
      <h3>r/{name} Rules</h3>
      <ul>
        <RuleAccordion
          index={1}
          title=" Be respectful to others"
          details="This subreddit is a community of individuals with diverse backgrounds and opinions. While we encourage open and honest discussion, please refrain from making personal attacks, using hate speech, or engaging in any form of discrimination."
        />
        <RuleAccordion
          index={2}
          title="Stay on-topic"
          details="Please ensure that all posts and comments are relevant to the subreddit's topic. Off-topic content may be removed by the moderators/admin."
        />
        <RuleAccordion
          index={3}
          title="No spam or self-promotion"
          details="Do not use this subreddit to promote your own products, services, or content. If you would like to share something with the community, please ensure that it is relevant and adds value to the discussion."
        />
        <RuleAccordion
          index={4}
          title="No NSFW content"
          details="This subreddit is intended for all ages, and therefore, explicit or NSFW content is not allowed. This includes but is not limited to sexual content, violence, and graphic images."
        />
        <RuleAccordion
          index={5}
          title="Follow the Reddit Content Policy"
          details="All content posted on this subreddit must adhere to the Reddit Content Policy. This includes but is not limited to illegal activities, harassment, and doxxing. Any content that violates the Content Policy may be removed by the moderators/admin."
        />
        <RuleAccordion
          index={5}
          title="No bullying or harassment"
          details=" This subreddit is a safe space for all individuals to discuss and share their thoughts and experiences. We do not tolerate any form of bullying, harassment, or intimidation towards others."
        />
        <RuleAccordion
          index={5}
          title="Report harmful behavior"
          details="If you witness any harmful behavior, such as bullying or self-harm encouragement, please report it to the moderators immediately. We take these reports seriously and will take action to address the issue."
        />
      </ul>
    </aside>
  );
}

export default SubredditRules;
