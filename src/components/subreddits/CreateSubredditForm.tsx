import { useEffect, useState } from 'react';
import styles from './CreateSubredditForm.module.scss';
import { User } from '@/types/types';
import AuthInput from '../auth/AuthInput';
import validateSubreddit from '@/utils/validators/validateSubreddit';
import debounce from 'lodash.debounce';
import addSubreddit from '@/firebase/firestore/addSubreddit';
import checkSubredditAvailability from '@/firebase/firestore/checkSubredditAvailability';

type CreateSubredditFormProps = {
  user: User;
};

function CreateSubredditForm(props: CreateSubredditFormProps) {
  const { user } = props;

  const [subName, setSubName] = useState('');
  const [isSubNameValid, setSubNameValidity] = useState(false);
  const [subNameError, setSubNameError] = useState('');
  const [submissionError, setSubmissionError] = useState('');
  const DEBOUNCE_TIME = 600;
  const MAX_NAME_LENGTH = 21;

  const handleSubNameChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      setSubName(inputValue);

      try {
        const validity = validateSubreddit(inputValue);
        setSubNameValidity(validity);
      } catch (error) {
        if (error instanceof Error) {
          setSubNameValidity(false);
          setSubNameError(error.message);
        }
      }
    },
    DEBOUNCE_TIME,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!user)
        throw new Error('You have to be logged in to create a subreddit.');

      const isSubredditAvailable = await checkSubredditAvailability(subName);

      if (!isSubredditAvailable)
        throw new Error('Subreddit name is already taken. Try another name.');

      const result = await addSubreddit(subName, user);

      if (result) {
        setSubNameError('');
        console.log('successfully added subreddit');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        setSubmissionError(error.message);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => setSubNameError(''), 7500);
  }, [subNameError]);

  useEffect(() => {
    setTimeout(() => setSubmissionError(''), 7500);
  }, [submissionError]);

  useEffect(() => {
    return () => handleSubNameChange.cancel();
  }, [handleSubNameChange]);

  return (
    <form action="" className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <label htmlFor="create-subreddit" className={styles.label}>
          Fill in your community name here
        </label>
        <AuthInput
          id="create-subreddit"
          type="text"
          name="subreddit_name"
          label="Subreddit Name"
          handleChange={handleSubNameChange}
          value={subName}
          isValid={isSubNameValid}
          errorMessage={subNameError}
          minLength={1}
          maxLength={21}
          isRequired
        />
        <span
          className={styles.charLeft}
          aria-label="Number of characters left"
        >
          {MAX_NAME_LENGTH - subName.length}/21
        </span>
      </div>

      {submissionError.length > 0 && (
        <div className={styles.error} role="alert">
          {submissionError}
        </div>
      )}

      <button type="submit" className={styles.btn}>
        Create Community
      </button>
    </form>
  );
}
export default CreateSubredditForm;
