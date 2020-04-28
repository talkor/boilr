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
import { ref, onMounted } from '@vue/composition-api';

export default {
  setup() {
    const message = ref('');

    onMounted(() => {
      firebase
        .auth()
        .getRedirectResult()
        .then(function(result) {
          if (result.credential) {
            message.value = result.user.email;
          }
        });
    });

    const login = () => {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
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
