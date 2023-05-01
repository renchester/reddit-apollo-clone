import styles from '../AuthPage.module.scss';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { ReactElement, useEffect, useState } from 'react';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import googleLogo from '@/assets/img/google-logo.png';

import createAccountWithGoogle from '@/firebase/auth/googleSignup';

function SignupPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setTimeout(() => setErrorMessage(''), 7500);
  }, [errorMessage]);

  const handleGoogleSignUp = async () => {
    try {
      await createAccountWithGoogle();
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    }
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

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
              <button
                type="button"
                className={styles.auth__btnProvider}
                aria-haspopup
                aria-label="Create account with Google"
                onClick={handleGoogleSignUp}
              >
                <Image
                  src={googleLogo}
                  alt="Google logo"
                  width={30}
                  className={styles.auth__providerIcon}
                />
                <span className={styles.auth__providerText}>
                  Sign up with Google
                </span>
              </button>
            </div>
            <div className={styles.auth__separator}>OR</div>
            <form action="" className={styles.form}>
              <div
                className={`${
                  email.length > 1
                    ? styles.form__inputWrapperFilled
                    : styles.form__inputWrapper
                }`}
              >
                <label htmlFor="signup_email" className={styles.form__label}>
                  Email
                </label>
                <input
                  id="signup_email"
                  type="email"
                  name="email"
                  className={styles.form__input}
                  onChange={handleChangeEmail}
                  value={email}
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
            {errorMessage && <div className={styles.error}>{errorMessage}</div>}
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
