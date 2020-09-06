<style scoped lang="scss"></style>

<template>
  <AppView class="preferences">
    <ViewHeader title="Preferences">
      <template v-slot:left>
        <BackButton />
      </template>
    </ViewHeader>
    <ViewContent>
      <Subtitle text="Extra shower time" class="section-heading" />
      <Divider />
      <Subtitle text="In-Shower Beep reminders" class="section-heading" />
      <Toggle
        class="toggleBtn"
        :active="isSoundEnabled"
        @toggle="onActiveToggle"
      />
      <Divider />
      <Subtitle text="Temperature mode" class="section-heading" />
      <RadioButton
        option1="C"
        option2="F"
        :value="temperatureMode"
        @input="onModeChange"
      />
      <Divider />
    </ViewContent>
  </AppView>
</template>

<script>
import 'firebase/auth';
import Toggle from '@/components/core/Toggle';
import BackButton from '@/components/core/BackButton';
import AppView from '@/components/shell/AppView';
import ViewHeader from '@/components/shell/ViewHeader';
import ViewContent from '@/components/shell/ViewContent';
import Divider from '@/components/core/Divider';
import RadioButton from '@/components/core/RadioButton';
import { postUserData } from '@/services/userService';
import { ref } from '@vue/composition-api';
import Subtitle from '@/components/core/Subtitle';

export default {
  props: {
    mode: String,
    isSoundEnabled: Boolean
  },
  setup({ mode }) {
    const temperatureMode = ref(mode);

    const onActiveToggle = (value) => {
      postUserData({ isSoundEnabled: value });
    };

    const onModeChange = (value) => {
      postUserData({ temperatureMode: value });
    };

    return {
      onActiveToggle,
      onModeChange,
      temperatureMode
    };
  },
  components: {
    Toggle,
    BackButton,
    Divider,
    AppView,
    ViewHeader,
    ViewContent,
    RadioButton,
    Subtitle
  }
};
</script>

<style scoped lang="scss">
.beep {
  display: flex;
  align-items: left;
  padding: 7px;
}
.toggleBtn {
  margin-left: -310px;
}
.section-heading {
  font-weight: 600;
  margin-block-end: 20px;
}
</style>
