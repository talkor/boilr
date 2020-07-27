import * as firebase from 'firebase/app';

export const getUserUid = () => {
  return firebase.auth().currentUser.uid;
};
