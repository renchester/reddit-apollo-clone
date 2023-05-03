import styles from './CreateSubredditPage.module.scss';
import { type ReactElement } from 'react';
import Head from 'next/head';
import AsideContainer from '@/components/asides/AsideContainer';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import RuleAccordion from '@/components/shared/RuleAccordion';
import { useAuth } from '@/hooks/useAuth';
import CreateSubredditForm from '@/components/subreddits/CreateSubredditForm';
import AsideTemplate from '@/components/asides/AsideTemplate';

function CreateSubredditPage() {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>Create Subreddit - Reddit Clone</title>
      </Head>

      <div className="page__container">
        <main className="page__feed">
          <h1 className="page__title">Create a Subreddit</h1>
          <section aria-labelledby="rules__heading" className={styles.rules}>
            <h2 id="rules__heading" className={styles.rules__heading}>
              Rules
            </h2>
            <ul className={styles.rules__list}>
              <RuleAccordion
                index={1}
                title="You must have a Reddit account that is at least 30 days old"
                details="You must have a Reddit account in order to create a community. In addition, your account must also be at least 30-days-old. As of writing, there are no karma requirements to create a subreddit"
              />
              <RuleAccordion
                index={2}
                title="Your new community must have a unique name"
                details="Your subreddit must have a unique name consisting of only letters, numbers, and underscores between 3 and 21 characters. Subreddit names are case-sensitive. Take good notice of the name as you will not be allowed to edit your subreddit name in the future."
              />
              <RuleAccordion
                index={3}
                title="No NSFW/Discriminatory/Hate-oriented content"
                details="Your community must maintain a safe and inclusive environment that respects the diversity and dignity of all members. This site has a strict policy against (1) pornographic/sexually-explicit materials; (2) hate speech or speech that promotes discrimination; and (3) violent/graphic content that promotes harm to others"
              />
            </ul>
          </section>

          <section>
            {user ? (
              <CreateSubredditForm user={user} />
            ) : (
              <p className="not-signed-in">
                You must be signed in to create a subreddit.
              </p>
            )}
          </section>
        </main>

        <AsideContainer>
          <AsideTemplate
            title="Create Subreddit"
            description="Looking to create a new community? You're in luck! This is tthe right place!"
          />
        </AsideContainer>
      </div>
    </>
  );
}

CreateSubredditPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MasterLayout>
      <FeedPageLayout label="Create Subreddit">{page}</FeedPageLayout>
    </MasterLayout>
  );
};

export default CreateSubredditPage;
