<template>
  <div class="profile">
    <BackButton />
    <Title text="My Profile" />
    <TextBox
      type="input"
      label="Name"
      placeholder="Want to change your name?"
      @input="onNameChange"
    />
    <Button
      class="button"
      :noBorder="false"
      :noPadding="false"
      :rounded="false"
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
import {  postUserData } from '@/services/userService';
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

<style scoped lang="scss">
.button {
  box-shadow: inset 0px 1px 0px 0px #bbdaf7;
  background: linear-gradient(to bottom, #79bbff 5%, #378de5 100%);
  background-color: #79bbff;
  border-radius: 6px;
  border: 1px solid #84bbf3;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #528ecc;
}
.button:active {
  position: relative;
  top: 1px;
}
</style>
