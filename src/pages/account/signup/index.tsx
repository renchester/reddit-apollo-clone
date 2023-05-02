import styles from '../AuthPage.module.scss';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import googleLogo from '@/assets/img/google-logo.png';
import { AnimatePresence, motion } from 'framer-motion';
import createAccountWithGoogle from '@/firebase/auth/signupWithGoogle';
import createAccountWithEmail from '@/firebase/auth/signupWithEmail';
import { useAuth } from '@/hooks/useAuth';
import AuthInput from '@/components/auth/AuthInput';
import validateEmail from '@/utils/validators/validateEmail';
import debounce from 'lodash.debounce';
import validateUsername from '@/utils/validators/validateUsername';
import validatePassword from '@/utils/validators/validatePassword';
import checkUsernameAvailability from '@/firebase/auth/checkUsernameAvailability';
import checkEmailAvailability from '@/firebase/auth/checkEmailAvailability';
import { FirebaseError } from 'firebase/app';
import signOutUser from '@/firebase/auth/signOutUser';

function SignupPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [googleError, setGoogleError] = useState('');
  const [signupError, setSignupError] = useState('');

  const DEBOUNCE_TIME = 600;
  const [email, setEmail] = useState('');
  const [isEmailValid, setEmailValidity] = useState(false);
  const [emailError, setEmailError] = useState('');

  const [username, setUsername] = useState('');
  const [isUsernameValid, setUsernameValidity] = useState(false);
  const [usernameError, setUsernameError] = useState('');

  const [password, setPassword] = useState('');
  const [isPasswordValid, setPasswordValidity] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const isButtonDisabled = !(
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid
  );

  const handleGoogleSignup = async () => {
    try {
      const result = await createAccountWithGoogle();

      if (result) {
        router.push('/');
      } else {
        await signOutUser();
        router.push('/');
      }
    } catch (e) {
      if (e instanceof Error || e instanceof FirebaseError) {
        setGoogleError(e.message);
      }
    }
  };

  const handleEmailSignup = async () => {
    try {
      const result = await createAccountWithEmail(email, username, password);

      if (result) {
        router.push('/');
      } else {
        await signOutUser();
        router.push('/');
      }
    } catch (e) {
      if (e instanceof Error || e instanceof FirebaseError) {
        setSignupError(e.message);
      }
    }
  };

  const handleEmailChange = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setEmail(inputValue);

      try {
        const isValid = validateEmail(inputValue);
        const isEmailAvailable = await checkEmailAvailability(inputValue);

        if (isValid && isEmailAvailable) {
          setEmailValidity(true);
        }

        if (!isEmailAvailable) {
          throw new Error('Email is already in use. Try logging in instead');
        }
      } catch (error) {
        if (error instanceof Error) {
          setEmailValidity(false);
          setEmailError(error.message);
        }
      }
    },
    DEBOUNCE_TIME,
  );

  const handleUsernameChange = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setUsername(inputValue);

      try {
        const validity = validateUsername(inputValue);
        setUsernameValidity(validity);

        const isUsernameAvailable = await checkUsernameAvailability(inputValue);

        if (!isUsernameAvailable) {
          throw new Error('Username is already taken');
        }
      } catch (error) {
        if (error instanceof Error) {
          setUsernameValidity(false);
          setUsernameError(error.message);
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

  // Remove error message
  const ERROR_TIME = 10000;
  useEffect(() => {
    setTimeout(() => setGoogleError(''), ERROR_TIME);
  }, [googleError]);

  useEffect(() => {
    setTimeout(() => setSignupError(''), ERROR_TIME);
  }, [signupError]);

  // Cancel debounce on unmount
  useEffect(() => {
    return () => handleEmailChange.cancel();
  }, [handleEmailChange]);

  useEffect(() => {
    return () => handleUsernameChange.cancel();
  }, [handleUsernameChange]);

  useEffect(() => {
    return () => handlePasswordChange.cancel();
  }, [handlePasswordChange]);

  return (
    <>
      <Head>
        <title>Sign up - Reddit Clone</title>
      </Head>
      <div className="page__container">
        {user ? (
          <div className={styles.signedIn}>
            <p>Successfully signed in as {user.email}</p>
            <br />
            <p>Redirecting you to the home page...</p>
          </div>
        ) : (
          <main className={styles.main} aria-labelledby="info__title">
            <section className={styles.info}>
              <h2 id="info__title" className={styles.info__title}>
                Sign up
              </h2>
              <p className={styles.info__terms}>
                By continung, you are setting up an account on this Reddit
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
                  onClick={handleGoogleSignup}
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
                <AuthInput
                  id="signup__email"
                  name="email"
                  type="email"
                  label="Email"
                  value={email}
                  handleChange={handleEmailChange}
                  isValid={isEmailValid}
                  errorMessage={emailError}
                />

                <AnimatePresence>
                  {isEmailValid && email.length > 0 && (
                    <>
                      <AuthInput
                        key="signup__username"
                        id="signup__username"
                        name="username"
                        type="text"
                        label="Username"
                        value={username}
                        handleChange={handleUsernameChange}
                        isValid={isUsernameValid}
                        errorMessage={usernameError}
                      />
                      <AuthInput
                        key="signup__password"
                        id="signup__password"
                        name="password"
                        type="password"
                        label="Password"
                        value={password}
                        handleChange={handlePasswordChange}
                        isValid={isPasswordValid}
                        errorMessage={passwordError}
                      />
                    </>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {googleError && (
                    <motion.div
                      className={styles.error}
                      role="alert"
                      aria-live="assertive"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {googleError}
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {signupError && (
                    <motion.div
                      className={styles.error}
                      role="alert"
                      aria-live="assertive"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {signupError}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  className={styles.form__btnSubmit}
                  {...{
                    disabled: isButtonDisabled,
                  }}
                  onClick={handleEmailSignup}
                >
                  {isButtonDisabled ? 'Continue' : 'Sign up'}
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
        )}
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
