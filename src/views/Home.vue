<template>
  <div class="home">
    <router-link to="login">Go To Login</router-link>
    <button @click="onLogOut">LogOut</button>
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default {
  setup(props, { root }) {
    const router = root.$router;

    const onLogOut = async () => {
      try {
        await firebase.auth().signOut();
        router.replace({ name: 'Login' });
      } catch (error) {
        console.error(error);
      }
    };
    return {
      onLogOut
    };
  }
};
</script>
