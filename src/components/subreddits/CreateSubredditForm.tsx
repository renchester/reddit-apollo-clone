import { useEffect, useRef, useState } from 'react';
import styles from './CreateSubredditForm.module.scss';
import { User } from '@/types/types';
import { useSnackbar } from '@/hooks/useSnackbar';
import AuthInput from '../auth/AuthInput';
import validateSubreddit from '@/utils/validators/validateSubreddit';
import debounce from 'lodash.debounce';
import addSubreddit from '@/firebase/firestore/subreddits/create/addSubreddit';
import checkSubredditAvailability from '@/firebase/firestore/subreddits/read/checkSubredditAvailability';

type CreateSubredditFormProps = {
  user: User;
};

function CreateSubredditForm(props: CreateSubredditFormProps) {
  const { user } = props;
  const { addAlert } = useSnackbar();

  const [subName, setSubName] = useState('');
  const [isSubNameValid, setSubNameValidity] = useState(false);
  const [subNameError, setSubNameError] = useState('');

  const [subDescription, setSubDescription] = useState('');

  const formRef = useRef<HTMLFormElement | null>(null);

  const isButtonDisabled = !(
    !subNameError &&
    isSubNameValid &&
    subName.length > 2
  );
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

  const handleSubDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSubDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!user)
        throw new Error('You have to be logged in to create a subreddit.');

      const isSubredditAvailable = await checkSubredditAvailability(subName);

      if (!isSubredditAvailable)
        throw new Error('Subreddit name is already taken. Try another name.');

      const result = await addSubreddit(subName, subDescription, user);

      if (result) {
        addAlert({
          message: `Successfully added r/${subName}`,
          status: 'success',
        });

        setSubNameError('');
        setSubName('');
        setSubDescription('');

        if (formRef.current) formRef.current.reset();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        addAlert({
          message: error.message,
          status: 'error',
        });
      }
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => setSubNameError(''), 7500);
  }, [subNameError]);

  useEffect(() => {
    return () => handleSubNameChange.cancel();
  }, [handleSubNameChange]);

  return (
    <form
      action=""
      className={styles.form}
      onSubmit={handleSubmit}
      ref={formRef}
    >
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
          minLength={3}
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

      {isSubNameValid && (
        <div className={styles.inputWrapper}>
          <label htmlFor="create-subreddit-desc" className={styles.label}>
            Optional: Enter a short description for your new subreddit to entice
            new members!
          </label>
          <AuthInput
            id="create-subreddit-desc"
            type="text"
            name="subreddit_desc"
            label="Description (optional)"
            handleChange={handleSubDescriptionChange}
            value={subDescription}
            maxLength={300}
            isValid
          />
        </div>
      )}

      <button type="submit" className={styles.btn} disabled={isButtonDisabled}>
        Create Community
      </button>
    </form>
  );
}
export default CreateSubredditForm;
