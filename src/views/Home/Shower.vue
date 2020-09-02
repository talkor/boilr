<template>
  <AppView class="shower">
    <ViewHeader title="Shower">
      <template v-slot:left>
        <BackButton icon="times" />
      </template>
    </ViewHeader>
    <ViewContent>
      <img width="100%" height="100%" class="shower-image" src="../../assets/shower.png" />
      <Timer class="timer" />
      <CoreButton
        class="start-shower"
        size="medium"
        text="End Shower"
        primary
        @click="playSound"
      />
    </ViewContent>
  </AppView>
</template>

<script>
import AppView from '@/components/shell/AppView';
import ViewHeader from '@/components/shell/ViewHeader';
import ViewContent from '@/components/shell/ViewContent';
import CoreButton from '@/components/core/CoreButton';
import BackButton from '@/components/core/BackButton';
import Timer from '@/components/Timer';
import { Howl } from 'howler';

export default {
  setup() {
    const playSound = () => {
      var sound = new Howl({
        src: ['pinwheel.mp3']
      });

      sound.play();
    };

    return { playSound };
  },
  components: {
    AppView,
    ViewHeader,
    ViewContent,
    CoreButton,
    BackButton,
    Timer
  }
};
</script>

<style lang="scss" scoped>
.timer {
  margin-block-end: 50px;
}
</style>
