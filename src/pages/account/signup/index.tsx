import styles from '../AuthPage.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import { ReactElement } from 'react';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import googleLogo from '@/assets/img/google-logo.png';
import Link from 'next/link';

function SignupPage() {
  return (
    <>
      <Head>
        <title>Sign up - Reddit Clone</title>
      </Head>
      <div className="page__container">
        <main className={styles.main} aria-labelledby="info__title">
          <section className={styles.info}>
            <h2 id="info__title" className={styles.info__title}>
              Sign up
            </h2>
            <p className={styles.info__terms}>
              By continung, you are setting up an account on this Reddit clone.
              There are no User Agreements or Privacy Policies for this website.
            </p>
          </section>

          <section className={styles.auth}>
            <div className={styles.auth__provider}>
              <button type="button" className={styles.auth__btnProvider}>
                <Image
                  src={googleLogo}
                  alt="Google logo"
                  width={30}
                  className={styles.auth__providerIcon}
                />
                <span className={styles.auth__providerText}>
                  Continue with Google
                </span>
              </button>
            </div>
            <div className={styles.auth__separator}>OR</div>
            <form action="" className={styles.form}>
              <div className={styles.form__inputWrapper}>
                <label htmlFor="signup_email" className={styles.form__label}>
                  Email
                </label>
                <input
                  id="signup_email"
                  type="email"
                  className={styles.form__input}
                />
              </div>
              <button type="button" disabled className={styles.form__btnSubmit}>
                Continue
              </button>
            </form>
            <div className={styles.other}>
              <span className={styles.other__text}>Already a redditor?</span>
              <Link href="/account/login" className={styles.other__link}>
                Log in
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

SignupPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MasterLayout>
      <FeedPageLayout label="Sign up">{page}</FeedPageLayout>
    </MasterLayout>
  );
};
export default SignupPage;
