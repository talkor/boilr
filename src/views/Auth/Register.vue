<template>
  <div class="register">
    <BackButton />
    <Title text="Register" />
    <TextBox
      type="text"
      label="Name"
      placeholder="Name"
      @onInput="onNameChange"
    />
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
    <Button
      @onClick="onRegister"
      text="Register"
      class="register-button"
    />
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { reactive } from '@vue/composition-api';
import TextBox from '@/components/core/TextBox/TextBox';
import Button from '@/components/core/Button/Button';
import BackButton from '@/components/core/BackButton/BackButton';
import Title from '@/components/core/Title/Title';

export default {
  name: 'Register',
  setup(props, { root }) {
    const router = root.$router;

    const form = reactive({
      name: '',
      email: '',
      password: ''
    });

    const onNameChange = value => {
      form.name = value;
    };

    const onEmailChange = value => {
      form.email = value;
    };

    const onPasswordChange = value => {
      form.password = value;
    };

    const onRegister = async () => {
      try {
        firebase
          .auth()
          .createUserWithEmailAndPassword(form.email, form.password)
          .then(data => {
            firebase
              .firestore()
              .collection('users')
              .doc(data.user.uid)
              .set({
                name: 'talkor',
                email: data.user.email,
                uid: data.user.uid
              });
          });
        router.replace({ name: 'Home' });
      } catch (error) {
        throw new Error(error);
      }
    };

    return {
      onRegister,
      onNameChange,
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

<style scoped lang="scss">
.register-button {
  width: 150px;
}
</style>
