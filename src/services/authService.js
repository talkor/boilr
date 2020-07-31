import * as firebase from 'firebase/app';

export const getUserUid = () => {
  if (!firebase.auth().currentUser) {
    return null;
  }

  return firebase.auth().currentUser.uid;
};
