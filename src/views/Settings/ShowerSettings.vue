
<template>
  <AppView class="shower">
    <ViewHeader title="Shower Settings">
      <template v-slot:left>
        <BackButton />
      </template>
    </ViewHeader>
    <ViewContent>
      <Slider label="Default Shower Time" :value="defaultShowerTime" @change="onTimeChange" />
    </ViewContent>
  </AppView>
</template>

<script>
import { ref } from '@vue/composition-api';
import NumberInput from '@/components/core/NumberInput';
import BackButton from '@/components/core/BackButton';
import Title from '@/components/core/Title';
import { getUserData, postUserData } from '@/services/userService';
import { onMounted } from '@vue/composition-api';
import Button from '@/components/core/Button';
import AppView from '@/components/shell/AppView';
import ViewHeader from '@/components/shell/ViewHeader';
import ViewContent from '@/components/shell/ViewContent';
import Slider from '@/components/core/Slider';

export default {
  props: {
    defaultShowerTime: Number
  },
  setup({}, { emit }) {
    const onTimeChange = (value) => {
      console.log('onchange', value);
      postUserData({ defaultShowerTime: value });
    };

    return {
      onTimeChange
    };
  },
  components: {
    NumberInput,
    BackButton,
    Title,
    Button,
    AppView,
    ViewHeader,
    ViewContent,
    Slider
  }
};
</script>

<style scoped lang="scss"></style>
