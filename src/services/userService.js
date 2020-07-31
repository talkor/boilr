import { getUserUid } from '@/services/authService';
import { getData } from '@/services/databaseService';

export const getUserData = async () => {
  const userUid = await getUserUid();
  if (!userUid) {
    return;
  }
  return getData({ collection: 'users', doc: userUid });
};
