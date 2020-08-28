import * as firebase from 'firebase/app';

import { updateData } from '@/services/databaseService';
import { getUserData } from '@/services/userService';

export const log = async (data) => {
  const { device, uid, name } = await getUserData();
  return updateData({
    collection: 'devices',
    doc: device,
    data: {
      log: firebase.firestore.FieldValue.arrayUnion({
        timestamp: new Date(),
        uid,
        name,
        ...data
      })
    }
  });
};
