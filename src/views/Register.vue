<template>
  <div class="register">
    <h1>Register</h1>
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
    <Button @onClick="onRegister" text="Register" />
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { reactive } from '@vue/composition-api';
import TextBox from '@/components/core/TextBox/TextBox';
import Button from '@/components/core/Button/Button';

export default {
  name: 'Register',
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

    const onRegister = async () => {
      try {
        const user = firebase
          .auth()
          .createUserWithEmailAndPassword(form.email, form.password);
        console.log(user);
        router.replace({ name: 'Home' });
      } catch (error) {
        console.error(error);
      }
    };

    return {
      onRegister,
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
