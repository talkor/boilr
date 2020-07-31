import { getUserUid } from '@/services/authService';
import { getData, postData } from '@/services/databaseService';

export const getUserData = async () => {
  const userUid = await getUserUid();
  if (!userUid) {
    return;
  }
  return getData({ collection: 'users', doc: userUid });
};

export const postUserData = async data => {
  const userUid = await getUserUid();
  if (!userUid) {
    return;
  }
  return postData({ collection: 'users', doc: userUid, data });
};
