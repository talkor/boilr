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

export const watchDevice = async ({ device }, callback = () => {}) => {
  let deviceId = device;
  if (!deviceId) {
    const { device } = await getUserData();
    deviceId = device;
  }
  return watchData({ collection: 'devices', doc: deviceId }, callback);
};
