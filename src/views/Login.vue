<template>
  <div class="login">
    <button @click="login">Login</button>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default {
  methods: {
    async login() {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          const token = result.credential.accessToken;
          const user = result.user;
          console.log(token, user);
        });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log('Logged out');
        });
    }
  }
};
</script>
