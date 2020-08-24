<template>
  <div class="profile">
    <BackButton />
    <Title text="My Profile" />
    <TextBox
      type="input"
      label="Name"
      placeholder="Your name"
      @input="onNameChange"
    />
    <Button
      :noBorder="false"
      :noPadding="false"
      :rounded="true"
      :text="save"
      @click="onSave"
    />
  </div>
</template>

<script>
import 'firebase/auth';
import TextBox from '@/components/core/TextBox';
import BackButton from '@/components/core/BackButton';
import Title from '@/components/core/Title';
import { postUserData } from '@/services/userService';
import Button from '@/components/core/Button';

export default {
  props: {
    name: String
  },
  setup({ name }, { root }) {
    const router = root.$router;
    const username = name;
    var newUsername = '';
    const save = 'Save';

    const onNameChange = (value) => {
      newUsername = value;
    };

    const onSave = () => {
      postUserData({ name: newUsername });
      router.push({ name: 'Settings', params: {} });
    };

    return {
      onNameChange,
      username,
      onSave,
      newUsername,
      save
    };
  },
  components: {
    TextBox,
    BackButton,
    Title,
    Button
  }
};
</script>

<style scoped lang="scss"></style>
