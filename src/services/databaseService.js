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

export const postData = ({ collection, doc, data, merge = true }) => {
  return db()
    .collection(collection)
    .doc(doc)
    .set({ ...data }, { merge });
};

const db = () => {
  return firebase.firestore();
};
