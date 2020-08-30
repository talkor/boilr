<style scoped lang="scss">
</style>

<template>
  <AppView class="preferences">
    <ViewHeader title="Preferences">
      <template v-slot:left>
        <BackButton />
      </template>
    </ViewHeader>
    <ViewContent>
      <Label
        text="Time to add if your shower time ends"
        :bold=true
        />
      <Divider />
      <div class='beep'>
      <Label
        text="In-Shower Beep reminders"
        :bold=true
        />
      <Toggle class = 'toggleBtn'
        :active=false
        @toggle="onActiveToggle"
      />
      </div>
      <Divider />
      <Label
        text="C/F"
        :bold=true
      />
      <Divider />
    </ViewContent>
  </AppView>
</template>

<script>
import 'firebase/auth';
import Toggle from '@/components/core/Toggle';
import Label from '@/components/core/Label';
import BackButton from '@/components/core/BackButton';
import AppView from '@/components/shell/AppView';
import ViewHeader from '@/components/shell/ViewHeader';
import ViewContent from '@/components/shell/ViewContent';
import Divider from '@/components/core/Divider';

import { getUserData, postUserData } from '@/services/userService';


export default {
  setup() {


    const onActiveToggle = (value) => {
      console.log("sound reminders toggled")
    };

    return {
      onActiveToggle
    };
  },
  components: {
    Toggle,
    BackButton,
    Label,
    Divider,
    AppView,
    ViewHeader,
    ViewContent
  }
};
</script>

<style scoped lang="scss">
.beep {
  display: flex;
  align-items: flex-start;
  padding: 7px;
}
.toggleBtn {
  margin-left: 50px;
}
</style>
