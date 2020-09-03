<template>
  <AppView class="shower">
    <ViewHeader title="Shower Settings">
      <template v-slot:left>
        <BackButton />
      </template>
    </ViewHeader>
    <ViewContent>
      <Subtitle text="Default Shower Time" class="section-heading" />
      <Label :text="`${showerTime} minutes`" />
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
import Subtitle from '@/components/core/Subtitle';
import { postUserData } from '@/services/userService';
import AppView from '@/components/shell/AppView';
import ViewHeader from '@/components/shell/ViewHeader';
import ViewContent from '@/components/shell/ViewContent';
import Slider from '@/components/core/Slider';
import Label from '@/components/core/Label';
import { ref } from '@vue/composition-api';

export default {
  props: {
    defaultShowerTime: Number
  },
  setup({ defaultShowerTime }) {
    const showerTime = ref(defaultShowerTime);

    const onTimeChange = (value) => {
      showerTime.value = value;
      postUserData({ defaultShowerTime: value });
    };

    return {
      onTimeChange,
      showerTime
    };
  },
  components: {
    BackButton,
    AppView,
    ViewHeader,
    ViewContent,
    Slider,
    Label,
    Subtitle
  }
};
</script>

<style scoped lang="scss">
.section-heading {
  font-weight: 600;
  margin-block-end: 10px !important;
}
</style>
