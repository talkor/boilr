<template>
  <div class="login">
    <h1>Log In</h1>
    <TextBox
      type="email"
      label="Email"
      placeholder="Email"
      @onInput="onEmailChange"
    />
    <TextBox
      type="password"
      label="Password"
      placeholder="Password"
      @onInput="onPasswordChange"
    />
    <Button @onClick="onLogIn" text="Login" />
    <!-- <h2>Sign In With Google</h2>
    <Button @onClick="onLogin" text="Log In" />
    <Button @onClick="onLogout" text="Log Out" />
    <div>{{ message }}</div> -->
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { reactive } from '@vue/composition-api';
import TextBox from '@/components/core/TextBox/TextBox';
import Button from '@/components/core/Button/Button';

export default {
  setup(props, { root }) {
    const router = root.$router;

    const form = reactive({
      email: '',
      password: ''
    });

    const onEmailChange = value => {
      form.email = value;
    };

    const onPasswordChange = value => {
      form.password = value;
    };

    // onMounted(() => {
    //   firebase
    //     .auth()
    //     .getRedirectResult()
    //     .then(function(result) {
    //       if (result.credential) {
    //         message.value = result.user.email;
    //       }
    //     });
    // });

    const onLogIn = async () => {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(form.email, form.password);
        router.replace({ name: 'Home' });
      } catch (error) {
        throw new Error(error);
      }
      // var provider = new firebase.auth.GoogleAuthProvider();
      // firebase.auth().signInWithRedirect(provider);
    };

    // const onLogout = () => {
    // firebase
    //   .auth()
    //   .signOut()
    //   .then(() => {
    //     message.value = 'Logged Out';
    //   });
    // };

    return {
      onLogIn,
      onEmailChange,
      onPasswordChange
    };
  },
  components: {
    TextBox,
    Button
  }
};
</script>
