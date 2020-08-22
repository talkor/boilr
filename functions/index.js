const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

export const taskRunner = functions.pubsub
  .schedule('* * * * *')
  .onRun(async (context) => {
    console.log('job');
    const data = await db
      .collection('devices')
      .doc('mhXWbGB4UxIdOPqeoOJz')
      .get()
      .then((snapshot) => {
        return { ...snapshot.data() };
      });

    console.log(data);
  });
