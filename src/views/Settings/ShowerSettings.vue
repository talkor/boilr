<template>
  <AppView class="shower">
    <ViewHeader title="Shower Settings">
      <template v-slot:left>
        <BackButton />
      </template>
    </ViewHeader>
    <ViewContent>
      <Slider
        label="Default Shower Time"
        :value="defaultShowerTime"
        @change="onTimeChange"
      />
    </ViewContent>
  </AppView>
</template>

<script>
import BackButton from '@/components/core/BackButton';
import { postUserData } from '@/services/userService';
import AppView from '@/components/shell/AppView';
import ViewHeader from '@/components/shell/ViewHeader';
import ViewContent from '@/components/shell/ViewContent';
import Slider from '@/components/core/Slider';

export default {
  props: {
    defaultShowerTime: Number
  },
  setup() {
    const onTimeChange = (value) => {
      console.log('onchange', value);
      postUserData({ defaultShowerTime: value });
    };

    return {
      onTimeChange
    };
  },
  components: {
    BackButton,
    AppView,
    ViewHeader,
    ViewContent,
    Slider
  }
};
</script>

<style scoped lang="scss"></style>
