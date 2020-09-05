<template>
  <CoreButton
    class="google-button"
    rounded
    @click="onLogin"
    size="medium"
    text="Sign In With Google"
  >
    <img src="../../assets/google.svg" class="google-icon" />
  </CoreButton>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import CoreButton from '@/components/core/CoreButton';
import { getData, postData } from '@/services/databaseService';

export default {
  setup(props, { root }) {
    const router = root.$router;

    const onLogin = async () => {
      try {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        await firebase
          .auth()
          .signInWithPopup(googleProvider)
          .then(async (data) => {
            const { email, uid, displayName, photoURL } = data.user;
            const newUser = await isNewUser(uid);

            if (newUser) {
              await postData({
                collection: 'users',
                doc: uid,
                data: {
                  name: displayName,
                  email,
                  uid,
                  device: 'mhXWbGB4UxIdOPqeoOJz',
                  photo: photoURL,
                  defaultShowerTime: 15,
                  temperatureMode: 'C'
                }
              });
              router.replace({ name: 'Onboarding' });
            } else {
              router.replace({ name: 'Home' });
            }
          });
      } catch (error) {
        throw new Error(error);
      }
    };

    const isNewUser = async (uid) => {
      const userData = await getData({ collection: 'users', doc: uid });
      if (userData.uid) {
        return false;
      }
      return true;
    };

    return {
      onLogin
    };
  },
  components: { CoreButton }
};
</script>
<style scoped lang="scss">
.google-button {
  width: 250px;
  color: gray;
  font-weight: 500;

  .google-icon {
    width: 20px;
    margin-right: 10px;
  }
}
</style>
