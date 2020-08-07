const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://boilr-app.firebaseio.com'
});

const db = admin.firestore();

exports.handler = async (event, context, callback) => {
  await db.collection('users').add({
    name: 'Test'
  });

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      data: `Test data added successfully`
    })
  });
};
