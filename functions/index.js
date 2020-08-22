const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

exports.taskRunner = functions.pubsub
  .schedule('* * * * *')
  .onRun(async (context) => {
    const data = await db
      .collection('devices')
      .doc('mhXWbGB4UxIdOPqeoOJz')
      .get()
      .then((snapshot) => {
        return { ...snapshot.data() };
      });

    db.collection('devices')
      .doc('mhXWbGB4UxIdOPqeoOJz')
      .set({ active: !data.active }, { merge });
  });
