import { getUserUid } from '@/services/authService';
import { getData, postData, deleteData } from '@/services/databaseService';

export const getUserData = async () => {
  const userUid = await getUserUid();
  if (!userUid) {
    return;
  }
  return getData({ collection: 'users', doc: userUid });
};

export const postUserData = async (data) => {
  const userUid = await getUserUid();
  if (!userUid) {
    return;
  }
  return postData({ collection: 'users', doc: userUid, data });
};

export const getUserPhotoByUuid = async (uuid) => {
  if (!uuid) {
    return;
  }
  const { photo } = await getData({ collection: 'users', doc: uuid });
  return photo;
};

export const getUserNameByUuid = async (uuid) => {
  if (!uuid) {
    return;
  }
  const { name } = await getData({ collection: 'users', doc: uuid });
  return name;
};

export const deleteUser = async () => {
  const userUid = await getUserUid();
  if (!userUid) {
    return;
  }
  return deleteData({ collection: 'users', doc: userUid });
};
