const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://boilr-app.firebaseio.com'
});

const db = admin.firestore();

exports.handler = async (event, context, callback) => {
  console.log(event, context);

  let time = 3; // mins

  await db
    .collection('devices')
    .doc('mhXWbGB4UxIdOPqeoOJz')
    .set({ active: true }, { merge: true });

  runTimer(time);
  console.log('timer finished');

  await db
    .collection('devices')
    .doc('mhXWbGB4UxIdOPqeoOJz')
    .set({ active: false }, { merge: true });

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      data: `Test data added successfully`
    })
  });
};

function runTimer(time) {
  time = time - 1;

  console.log('tick', time);

  if (time) {
    setTimeout(runTimer, time, 60 * 1000);
  }
}
