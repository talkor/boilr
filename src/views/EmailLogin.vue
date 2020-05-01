<template>
  <div class="sign-in">
    <h1>Sign In</h1>
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
    <Button @onClick="onSignIn" text="Sign In" />
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

    const onSignIn = async () => {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(form.email, form.password);
        router.replace({ name: 'Home' });
      } catch (error) {
        throw new Error(error);
      }
    };

    return {
      onSignIn,
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
