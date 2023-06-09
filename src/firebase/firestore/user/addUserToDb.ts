import { doc, setDoc, FieldValue } from 'firebase/firestore';
import { db } from '@/firebase/config';

type AddUserToDbProps = {
  user_id: string;
  username: string;
  email: string;
  date_created: FieldValue;
  provider: string;
};

const addUserToDb = async (props: AddUserToDbProps) => {
  const { user_id, username, email, date_created, provider } = props;

  try {
    const userRef = doc(db, 'users', user_id);

    await setDoc(userRef, {
      username,
      email,
      provider,
      date_created,
      user_id,
      comment_karma: 0,
      post_karma: 0,
      posts: [],
      comments: [],
    });

    return true;
  } catch (e) {
    console.error('Error: Problem setting new user in database');
    return null;
  }
};

export default addUserToDb;
