const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

const MAX_TEMP = 55;
const MIN_TEMP = 25;

exports.taskRunner = functions.pubsub
  .schedule('* * * * *')
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
          .set({ temperature: temperature + 1 }, { merge: true });
      } else {
        db.collection('devices')
          .doc('mhXWbGB4UxIdOPqeoOJz')
          .set({ active: false }, { merge: true });
      }
    } else if (temperature > MIN_TEMP) {
      db.collection('devices')
        .doc('mhXWbGB4UxIdOPqeoOJz')
        .set({ temperature: temperature - 0.5 }, { merge: true });
    }
  });
