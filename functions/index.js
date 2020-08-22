const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

const MAX_TEMP = 99;
const MIN_TEMP = 25;

exports.taskRunner = functions.pubsub
  .schedule('* * * * *')
  .timeZone('Asia/Jerusalem')
  .onRun(async (context) => {
    const { active, temperature } = await db
      .collection('devices')
      .doc('mhXWbGB4UxIdOPqeoOJz')
      .get()
      .then((snapshot) => {
        return { ...snapshot.data() };
      });

    if (active) {
      if (temperature < MAX_TEMP) {
        db.collection('devices')
          .doc('mhXWbGB4UxIdOPqeoOJz')
          .set({ temperature: temperature + 2 }, { merge: true });
      } else {
        db.collection('devices')
          .doc('mhXWbGB4UxIdOPqeoOJz')
          .set({ active: false }, { merge: true });
      }
    } else if (temperature > MIN_TEMP) {
      db.collection('devices')
        .doc('mhXWbGB4UxIdOPqeoOJz')
        .set({ temperature: temperature - 0.1 }, { merge: true });
    }
  });
