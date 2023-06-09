import styles from '../AuthPage.module.scss';
import { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import debounce from 'lodash.debounce';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import { useAuth } from '@/hooks/useAuth';
import { useSnackbar } from '@/hooks/useSnackbar';
import AuthInput from '@/components/auth/AuthInput';
import signOutUser from '@/firebase/auth/signOutUser';
import loginWithGoogle from '@/firebase/auth/loginWithGoogle';
import loginWithEmail from '@/firebase/auth/loginWithEmail';
import validateEmail from '@/utils/validators/validateEmail';
import validatePassword from '@/utils/validators/validatePassword';
import googleLogo from '@/assets/img/google-logo.png';

function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { addAlert } = useSnackbar();

  const DEBOUNCE_TIME = 600;
  const [email, setEmail] = useState('');
  const [isEmailValid, setEmailValidity] = useState(false);
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [isPasswordValid, setPasswordValidity] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const isButtonDisabled = !(isEmailValid && isPasswordValid);

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();

      if (result) {
        addAlert({ message: 'Successfully signed in', status: 'success' });
        router.push('/');
        router.reload();
      } else {
        await signOutUser();
        addAlert({ message: 'Cannot login at this moment', status: 'error' });
        router.push('/');
        router.reload();
      }
    } catch (e) {
      if (e instanceof Error) {
        addAlert({ message: e.message, status: 'error' });
      }
    }
  };

  const handleEmailLogin = async () => {
    try {
      if (!email) {
        setEmailError('You must provide an email before logging in');
      }

      if (!password) {
        setPasswordError('You must provide a password before logging in');
      }

      const result = await loginWithEmail(email, password);

      if (result) {
        addAlert({ message: 'Successfully signed in', status: 'success' });
        router.push('/');
        router.reload();
      } else {
        await signOutUser();
        addAlert({ message: 'Cannot login at this moment', status: 'error' });
        router.push('/');
        router.reload();
      }
    } catch (e) {
      if (e instanceof Error) {
        addAlert({ message: e.message, status: 'error' });
      }
    }
  };

  const handleEmailChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setEmail(inputValue);

      try {
        const validity = validateEmail(inputValue);
        setEmailValidity(validity);
      } catch (error) {
        if (error instanceof Error) {
          setEmailValidity(false);
          setEmailError(error.message);
        }
      }
    },
    DEBOUNCE_TIME,
  );

  const handlePasswordChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setPassword(inputValue);

      try {
        const validity = validatePassword(inputValue);
        setPasswordValidity(validity);
      } catch (error) {
        if (error instanceof Error) {
          setPasswordValidity(false);
          setPasswordError(error.message);
        }
      }
    },
    DEBOUNCE_TIME,
  );

  // Go back to home page if signed in
  useEffect(() => {
    if (user !== null) {
      setTimeout(() => router.push('/'), 1000);
    }
  }, [user, router]);

  // Cancel debounce on unmount
  useEffect(() => {
    return () => handleEmailChange.cancel();
  }, [handleEmailChange]);

  useEffect(() => {
    return () => handlePasswordChange.cancel();
  }, [handlePasswordChange]);

  return (
    <>
      <Head>
        <title>Log in - Reddit Clone</title>
      </Head>
      <div className="page__container">
        {user ? (
          <div className={styles.signedIn}>
            <p>Successfully logged in as {user.username}</p>
            <br />
            <p>Redirecting you to the home page...</p>
          </div>
        ) : (
          <main className={styles.main}>
            <section className={styles.info}>
              <h2 id="info__title" className={styles.info__title}>
                Log in
              </h2>
              <p className={styles.info__terms}>
                By continung, you are logging in to an account on this Reddit
                clone. There are no User Agreements or Privacy Policies for this
                website.
              </p>
            </section>

            <section className={styles.auth}>
              <div className={styles.auth__provider}>
                <button
                  type="button"
                  className={styles.auth__btnProvider}
                  aria-haspopup
                  aria-label="Create account with Google"
                  onClick={handleGoogleLogin}
                >
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
                <AuthInput
                  id="login__email"
                  name="email"
                  type="email"
                  label="Email"
                  value={email}
                  handleChange={handleEmailChange}
                  isValid={isEmailValid}
                  errorMessage={emailError}
                />
                <AuthInput
                  id="login__password"
                  name="password"
                  type="password"
                  label="Password"
                  value={password}
                  handleChange={handlePasswordChange}
                  isValid={isPasswordValid}
                  errorMessage={passwordError}
                />

                <button
                  type="button"
                  className={styles.form__btnSubmit}
                  onClick={handleEmailLogin}
                  {...{
                    disabled: isButtonDisabled,
                  }}
                >
                  Login
                </button>
              </form>

              <div className={styles.other}>
                <span className={styles.other__text}>New to Reddit Clone?</span>
                <Link href="/account/signup" className={styles.other__link}>
                  Sign up
                </Link>
              </div>
            </section>
          </main>
        )}
      </div>
    </>
  );
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MasterLayout>
      <FeedPageLayout label="Log in">{page}</FeedPageLayout>
    </MasterLayout>
  );
};

export default LoginPage;
