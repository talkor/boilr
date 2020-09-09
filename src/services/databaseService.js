import * as firebase from 'firebase/app';
import 'firebase/firestore';

export const getData = ({ collection, doc }) => {
  return db()
    .collection(collection)
    .doc(doc)
    .get()
    .then((snapshot) => {
      return { ...snapshot.data() };
    });
};

export const getAllData = ({ collection }) => {
  return firebase.firestore().collection(collection).get();
};

export const postData = ({ collection, doc, data, merge = true }) => {
  return db()
    .collection(collection)
    .doc(doc)
    .set({ ...data }, { merge });
};

export const updateData = ({ collection, doc, data }) => {
  return db()
    .collection(collection)
    .doc(doc)
    .update({ ...data });
};

export const deleteData = ({ collection, doc }) => {
  return db().collection(collection).doc(doc).delete();
};

export const watchData = ({ collection, doc }, callback) => {
  return db()
    .collection(collection)
    .doc(doc)
    .onSnapshot((snapshot) => {
      return callback({ ...snapshot.data() });
    });
};

const db = () => {
  return firebase.firestore();
};
