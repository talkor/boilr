<template>
  <portal to="shower-screen">
    <AppView class="shower">
      <ViewHeader title="Shower" />
      <!-- <ViewHeader title="Shower">
        <template v-slot:left>
          <BackButton icon="times" v-on:click="endShower" />
        </template> 
      </ViewHeader> -->
      <ViewContent>
        <img class="shower-image" src="../../assets/shower.svg" />
        <Timer
          class="timer"
          :time="
            (showerData && parseInt(showerData.duration, 10)) ||
            defaultShowerTime
          "
          :active="active_timer"
          @makeSoundIfNeeded="makeSoundIfNeeded"
        />
        <router-link :to="{ name: 'Home', params: {} }">
          <CoreButton
            class="start-shower"
            size="medium"
            text="End Shower"
            type="danger"
            @click="endShower"
          />
        </router-link>
      </ViewContent>
    </AppView>
  </portal>
</template>

<script>
import AppView from '@/components/shell/AppView';
import ViewHeader from '@/components/shell/ViewHeader';
import ViewContent from '@/components/shell/ViewContent';
import CoreButton from '@/components/core/CoreButton';
import Timer from '@/components/Timer';
import { ref, onMounted } from '@vue/composition-api';
import { Howl } from 'howler';

export default {
  props: {
    showerData: Object,
    defaultShowerTime: Number,
    isSoundEnabled: Boolean
  },
  setup({ isSoundEnabled }) {
    var active_timer = ref(true);
    var sound;

    onMounted(async () => {
      active_timer.value = true;
    });

    const makeSoundIfNeeded = (time, minutes, seconds, timeCounter) => {
      console.log(timeCounter);
      console.log('min: ' + minutes);
      console.log('sec: ' + seconds);
      if (
        ((time * 60) / 3) * 2 == minutes * 60 + seconds ||
        (time * 60) / 3 == minutes * 60 + seconds ||
        (time * 60) / 3 == minutes * 60 + seconds + 1
      ) {
        playSound('pinwheel.mp3');
      }
      if (minutes * 60 + seconds == 60) {
        playSound('one_minute_left.mp3');
      }
      if (minutes == 0 && seconds == 1) {
        playSound('your_time_is_up.mp3');
      }
      if (minutes == 0 && seconds == 0 && timeCounter % 60 == 0) {
        playSound('dont_waste.mp3');
      }
    };

    const endShower = () => {
      active_timer.value = false;
      if (sound != null) {
        sound.stop();
      }
    };

    const playSound = (inputSound) => {
      sound = new Howl({
        src: [inputSound]
      });
      if (isSoundEnabled) {
        sound.play();
      }
    };

    return {
      endShower,
      playSound,
      active_timer,
      makeSoundIfNeeded
    };
  },
  components: {
    AppView,
    ViewHeader,
    ViewContent,
    CoreButton,
    Timer
  }
};
</script>

<style lang="scss" scoped>
.timer {
  margin-block-end: 50px;
}

.shower-image {
  width: 335px;
  height: 335px;
  transition: 0.2s all;
}
</style>
