import { getData, postData, watchData } from '@/services/databaseService';
import { getUserData } from '@/services/userService';

export const getDeviceData = async () => {
  const { device } = await getUserData();
  return getData({ collection: 'devices', doc: device });
};

export const postDeviceData = async data => {
  const { device } = await getUserData();
  return postData({ collection: 'devices', doc: device, data });
};

export const watchDevice = async (callback = () => {}) => {
  const { device } = await getUserData();
  return watchData({ collection: 'devices', doc: device }, callback);
};
