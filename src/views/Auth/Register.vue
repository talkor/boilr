<template>
  <div class="register">
    <BackButton />
    <Title text="Register" />
    <TextBox
      type="text"
      label="Name"
      placeholder="Name"
      @input="onNameChange"
    />
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
    <Button @click="onRegister" text="Register" class="register-button" />
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { reactive } from '@vue/composition-api';
import TextBox from '@/components/core/TextBox';
import Button from '@/components/core/Button';
import BackButton from '@/components/core/BackButton';
import Title from '@/components/core/Title';

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
        await firebase
          .auth()
          .createUserWithEmailAndPassword(form.email, form.password)
          .then(data => {
            const { email, name, uid } = data.user;
            return firebase
              .firestore()
              .collection('users')
              .doc(uid)
              .set({
                name: form.name,
                email,
                uid,
                device: 'mhXWbGB4UxIdOPqeoOJz'
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
