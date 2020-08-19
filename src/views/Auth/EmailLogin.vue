<template>
  <div class="sign-in">
    <BackButton />
    <Title text="Sign In" />
    <TextBox
      type="email"
      label="Email"
      placeholder="Email"
      @input="onEmailChange"
    />
    <TextBox
      type="password"
      label="Password"
      placeholder="Password"
      @input="onPasswordChange"
    />
    <Button @click="onSignIn" text="Sign In" />
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { reactive } from '@vue/composition-api';
import TextBox from '@/components/core/TextBox';
import Button from '@/components/core/Button';
import BackButton from '@/components/core/BackButton';
import Title from '@/components/core/Title';

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
    Button,
    BackButton,
    Title
  }
};
</script>
