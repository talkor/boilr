<template>
  <div class="shower">
    <BackButton />
    <Title text="Shower Settings" />
    <NumberInput
      label="Default shower time"
      :defaultTime="time.defaultShowerTime"
      @input="onDefaultChange"
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
import { reactive } from '@vue/composition-api';
import NumberInput from '@/components/core/NumberInput';
import BackButton from '@/components/core/BackButton';
import Title from '@/components/core/Title';
import { getUserData, postUserData } from '@/services/userService';
import { onMounted } from '@vue/composition-api';
import Button from '@/components/core/Button';

export default {
  setup(props, { root }) {
    const router = root.$router;
    let userData;
    let newDefaultTime;
    const save = 'Save';

    const time = reactive({
      defaultShowerTime: ''
    });

    onMounted(async () => {
      userData = await getUserData();
      time.defaultShowerTime = userData.defaultShowerTime;
    });

    const onDefaultChange = (value) => {
      newDefaultTime = value;
    };

    const onSave = () => {
      postUserData({ defaultShowerTime: newDefaultTime });
      router.push({ name: 'Settings' });
    };

    return {
      onDefaultChange,
      onSave,
      newDefaultTime,
      time,
      save
    };
  },
  components: {
    NumberInput,
    BackButton,
    Title,
    Button
  }
};
</script>

<style scoped lang="scss"></style>
