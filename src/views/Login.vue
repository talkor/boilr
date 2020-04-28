<template>
  <div class="login">
    <button @click="login">Login</button>
    <button @click="logout">Logout</button>
    <span>{{ message }}</span>
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { ref } from '@vue/composition-api';

export default {
  setup() {
    const message = ref('');

    const login = () => {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // const token = result.credential.accessToken;
          const user = result.user;
          message.value = user;
        });
    };

    const logout = () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          message.value = 'Logged Out';
        });
    };

    return {
      login,
      logout,
      message
    };
  },
  methods: {}
};
</script>
