<template>
  <Button
    class="google-button"
    rounded
    @onClick="onLogin"
    size="is-medium"
    text="Sign In With Google"
  >
    <img src="../../assets/google.png" class="google-icon" />
  </Button>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import Button from '@/components/core/Button/Button';

export default {
  setup(props, { root }) {
    const router = root.$router;

    const onLogin = async () => {
      try {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(googleProvider);
        router.replace({ name: 'Home' });
      } catch (error) {
        throw new Error(error);
      }
    };

    return {
      onLogin
    };
  },
  components: { Button }
};
</script>
<style scoped lang="scss">
.google-button {
  width: 250px;
  margin: 10px 0;

  .google-icon {
    width: 20px;
    margin-right: 10px;
  }
}
</style>
