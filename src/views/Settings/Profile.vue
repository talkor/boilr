<template>
  <div class="profile">
    <BackButton />
    <Title text="My Profile" />
    <TextBox
      type="input"
      label="Name"
      placeholder="Your name"
      :value="user.username"
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
import { getUserData, postUserData } from '@/services/userService';
import Button from '@/components/core/Button';
import { onMounted } from '@vue/composition-api';
import { reactive } from '@vue/composition-api';

export default {
  setup(props, { root }) {
    const router = root.$router;
    var newUsername = '';
    const save = 'Save';

    const user = reactive({
      username: ''
    });

    onMounted(async () => {
      const userData = await getUserData();
      user.username = userData.name;
    });

    const onNameChange = (value) => {
      newUsername = value;
    };

    const onSave = () => {
      postUserData({ name: newUsername });
      router.push({ name: 'Settings', params: {} });
    };

    return {
      onNameChange,
      user,
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
