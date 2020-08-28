<template>
  <AppView class="profile">
    <ViewHeader title="My Profile">
      <template v-slot:left>
        <BackButton />
      </template>
    </ViewHeader>
    <ViewContent>
      <TextBox
        type="input"
        label="Name"
        placeholder="Name"
        :value="username"
        @input="onNameChange"
      />
    </ViewContent>
  </AppView>
</template>

<script>
import 'firebase/auth';
import TextBox from '@/components/core/TextBox';
import BackButton from '@/components/core/BackButton';
import { getUserData, postUserData } from '@/services/userService';
import { onMounted } from '@vue/composition-api';
import { ref } from '@vue/composition-api';
import AppView from '@/components/shell/AppView';
import ViewHeader from '@/components/shell/ViewHeader';
import ViewContent from '@/components/shell/ViewContent';

export default {
  setup() {
    const username = ref('');

    onMounted(async () => {
      const userData = await getUserData();
      username.value = userData.name;
    });

    const onNameChange = (value) => {
      username.value = value;
      postUserData({ name: value });
    };

    return {
      onNameChange,
      username
    };
  },
  components: {
    TextBox,
    BackButton,
    AppView,
    ViewHeader,
    ViewContent
  }
};
</script>

<style scoped lang="scss"></style>
