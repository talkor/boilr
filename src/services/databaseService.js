import * as firebase from 'firebase/app';
import 'firebase/firestore';

export const getData = ({ collection, doc }) => {
  return firebase
    .firestore()
    .collection(collection)
    .doc(doc)
    .get()
    .then(snapshot => {
      return { ...snapshot.data() };
    });
};

export const postData = ({ collection, doc, data, merge = true }) => {
  return firebase
    .firestore()
    .collection(collection)
    .doc(doc)
    .set(
      {
        ...data
      },
      { merge }
    );
};
