<template>
  <div class="timer">
    <span class="minutes">{{ `${timer.minutes}`.padStart(2, 0) }}</span
    >:<span class="seconds">{{ `${timer.seconds}`.padStart(2, 0) }} </span>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from '@vue/composition-api';

export default {
  props: {
    time: Number
  },
  setup(props) {
    const current = ref(props.time * 1000 * 60);
    const timer = reactive({
      minutes: 0,
      seconds: 0
    });

    const runTimer = () => {
      timer.minutes = Math.floor(current.value / 1000 / 60);
      timer.seconds = (current.value / 1000) % 60;
      current.value -= 1000;
      if (current.value > 0) {
        setTimeout(runTimer, 1000);
      }
    };

    onMounted(() => {
      runTimer();
    });

    return {
      timer
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
