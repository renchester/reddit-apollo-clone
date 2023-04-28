import styles from './PostMain.module.scss';
import Link from 'next/link';

type PostMainProps = {
  id: string;
};

function PostMain(props: PostMainProps) {
  const { id } = props;

  return (
    <section aria-label="Post details" className={styles.post}>
      <article
        aria-labelledby={`post-${id}__title`}
        className={styles.post__article}
      >
        <h2 id={`post-${id}__title`} className={styles.post__title}>
          Am I ignorant for asking the server for advice at an ethnic
          restaurant?
        </h2>
        <p className={styles.post__details}>
          Went to a Halal restaurant and found quite a few things on the menu
          that were a bit alien to me. I asked the server for advice and he
          pulled over a chair and explained the dishes. Afterwards, the people I
          went with.
        </p>
        <p className={styles.post__details}>
          Afterwards, the people I went with said it was embarrassing for me to
          ask stupid questions and that it made me look like another ignorant
          white guy. I think they felt that I could have taken the time to go
          online and read the menu in advance or just order something I
          recognized.
        </p>
        <p className={styles.post__details}>
          I would think asking for an employee&apos;s advice would be normal. Am
          I at all wrong here?
        </p>
      </article>

      <div className={styles.meta}>
        <Link href={'/'} className={styles.meta__subredditLink}>
          <i
            className={`material-symbols-outlined ${styles.meta__subredditIcon}`}
          >
            taunt
          </i>
          <span className={styles.meta__subreddit} aria-label="Subreddit name">
            NoStupidQuestions
          </span>
        </Link>
        <Link href={'/'} className={styles.meta__originalPoster}>
          by subredditor_typical
        </Link>
      </div>

      <div className={styles.meta}>
        <button
          type="button"
          aria-label="Upvote post"
          className={styles.meta__data}
        >
          <i
            className={`material-symbols-outlined ${styles.meta__icon} `}
            aria-hidden
          >
            north
          </i>
          <span aria-label="Number of upvotes for this post">121</span>
        </button>

        <div className={styles.meta__data}>
          <i className={`material-symbols-outlined ${styles.meta__icon}`}>
            sentiment_satisfied
          </i>
          <span>121</span>
        </div>

        <div className={styles.meta__data}>
          <i className={`material-symbols-outlined ${styles.meta__icon}`}>
            schedule
          </i>
          <span>20h</span>
        </div>
      </div>

      <div className={styles.control}>
        <button
          type="button"
          className={styles.control__btn}
          aria-label="Upvote button"
        >
          <i className={`material-symbols-outlined ${styles.control__icon}`}>
            north
          </i>
        </button>
        <button
          type="button"
          className={styles.control__btn}
          aria-label="Downvote button"
        >
          <i className={`material-symbols-outlined ${styles.control__icon}`}>
            south
          </i>
        </button>
        <button
          type="button"
          className={styles.control__btn}
          aria-label="Save/bookmark post button"
        >
          <i className={`material-symbols-outlined ${styles.control__icon}`}>
            bookmark
          </i>
        </button>
        <button
          type="button"
          className={styles.control__btn}
          aria-label="Reply to post button"
        >
          <i className={`material-symbols-outlined ${styles.control__icon}`}>
            reply
          </i>
        </button>
        <button
          type="button"
          className={styles.control__btn}
          aria-label="Share post button"
        >
          <i className={`material-symbols-outlined ${styles.control__icon}`}>
            ios_share
          </i>
        </button>
      </div>
    </section>
  );
}
export default PostMain;
