<template>
  <div class="settings">
    <Title text="Settings" />
    <Button @onClick="onLogOut" text="Log Out" />
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import Button from '@/components/core/Button/Button';
import Title from '@/components/core/Title/Title';

export default {
  setup(props, { root }) {
    const router = root.$router;

    const onLogOut = async () => {
      try {
        await firebase.auth().signOut();
        router.replace({ name: 'Login' });
      } catch (error) {
        throw new Error(error);
      }
    };
    return {
      onLogOut
    };
  },
  components: {
    Button,
    Title
  }
};
</script>
