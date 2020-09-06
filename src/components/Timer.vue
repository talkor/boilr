<template>
  <div class="timer">
    <span class="minutes">{{ `${timer.minutes}`.padStart(2, 0) }}</span
    >:<span class="seconds">{{ `${timer.seconds}`.padStart(2, 0) }} </span>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from '@vue/composition-api';
import { getUserData, postUserData } from '@/services/userService';
import { NotificationProgrammatic as Notification } from 'buefy';

export default {
  props: {
    time: Number,
    active: Boolean
  },
  setup(props, { emit }) {
    const current = ref(props.time * 1000 * 60);
    const timer = reactive({
      minutes: 0,
      seconds: 0
    });
    const totalShowersTime = ref(0);
    var timeCounter = 0;
    var userData;
    var message;

    const runTimer = () => {
      timer.minutes = Math.floor(current.value / 1000 / 60);
      timer.seconds = (current.value / 1000) % 60;
      current.value -= 1000;
      if (props.active == false) {
        clearTimeout(runTimer);
      } else if (current.value >= 0) {
        setTimeout(runTimer, 1000);
      }
    };

    const countSeconds = () => {
      if (props.active == false) {
        notify();
        clearTimeout(countSeconds);
        postUserData({
          totalShowersTime: timeCounter + totalShowersTime.value
        });
      } else {
        setTimeout(countSeconds, 1000);
        timeCounter++;
        emit(
          'makeSoundIfNeeded',
          props.time,
          timer.minutes,
          timer.seconds,
          timeCounter
        );
      }
    };

    const notify = () => {
      if (timeCounter > props.time * 60) {
        message = 'Nice try... next time you will need to do it faster';
      } else {
        message = 'Congratulations, you made it in time!';
      }
      Notification.open({
        indefinite: true,
        message: message,
        position: 'is-top',
        type: 'is-success'
      });
    };

    onMounted(async () => {
      userData = await getUserData();
      totalShowersTime.value = userData.totalShowersTime;
      runTimer();
      countSeconds();
    });

    return {
      countSeconds,
      timeCounter,
      timer,
      notify
    };
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.timer {
  font-size: 40px;
  color: $text-color;
}
</style>
